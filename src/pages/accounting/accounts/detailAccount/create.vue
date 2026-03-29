<template>
    <VCard>
        <VCardItem>
            <VCardTitle>Create Detail Account</VCardTitle>
            <VCardSubtitle>
                Enter the basic information for the detail account
            </VCardSubtitle>
        </VCardItem>

        <VDivider />

        <!-- Form -->
        <VCardText>
            <VForm ref="formRef" @submit.prevent="submit" class="mt-5">
                <VRow>
                    <!-- code -->
                    <VCol cols="12" sm="12" md="6" lg="4" xl="3">
                        <VTextField v-model="form.code" label="Code" placeholder="e.g. 1001" variant="outlined"
                            density="comfortable" :rules="[required]" :error-messages="errors.code?.[0]" />
                    </VCol>
                    <!-- Name -->
                    <VCol cols="12" sm="12" md="6" lg="4" xl="3">
                        <VTextField v-model="form.name" label="name" placeholder="e.g. Account name" variant="outlined"
                            density="comfortable" :rules="[required]" :error-messages="errors.name?.[0]" />
                    </VCol>
                    <!-- type_id and type_name-->
                    <VCol cols="12" sm="12" md="6" lg="4" xl="3">
                        <VTextField v-model="form.type_id" label="type_id" placeholder="detail account type id"
                            variant="outlined" density="comfortable" :rules="[required]"
                            :error-messages="errors.name?.[0]" />
                    </VCol>
                    <!-- national_id -->
                    <VCol cols="12" sm="12" md="6" lg="4" xl="3">
                        <VTextField v-model="form.national_id" label="national_id" placeholder="national_id"
                            variant="outlined" density="comfortable" :rules="[required]"
                            :error-messages="errors.national_id?.[0]" />
                    </VCol>
                    <!--description-->
                    <VCol cols="12">
                        <VTextField v-model="form.description" label="Description" placeholder="Optional description"
                            variant="outlined" density="comfortable" :error-messages="errors.description?.[0]" />
                    </VCol>
                </VRow>
            </VForm>
        </VCardText>

        <VDivider />

        <VCardActions class="justify-end gap-3 pa-4">
            <VBtn color="secondary" variant="tonal" @click="resetForm">
                Reset
            </VBtn>

            <VBtn color="primary" :loading="loading" @click="submit">
                Save
            </VBtn>
        </VCardActions>
    </VCard>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const notify = (options: { type: string; text: string }) => {
    console.log(`Notification [${options.type}]: ${options.text}`)
}

const router = useRouter()

const loading = ref(false)
//const errors = ref<Record<string, string[]>>({})
const errors = ref<Record<string, string[]>>({})

const form = reactive({
    code: '',
    name: '',
    type_id: '',
    type_name: '',
    national_id: '',
    description: ''
})

const required = (v: string | undefined) => !!v || 'This field is required'

const resetForm = () => {
    form.code = ''
    form.name = ''
    form.type_id = ''
    form.national_id = ''
    form.description = ''
    errors.value = {}
}

const API_BASE = import.meta.env.VITE_API_BASE_URL

const submit = async () => {
    loading.value = true

    try {
        const response = await fetch(`${API_BASE}/accounting/accounts/detail-accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(form),
        })

        const data = await response.json()

        if (!response.ok) {
            if (response.status === 422) {
                errors.value = data.errors || {}
                notify({ type: 'error', text: data.message || 'Validation failed. Please check the fields.' })
            } else {
                const errorMessage = data.message || `Request failed with status: ${response.status}`
                notify({ type: 'error', text: errorMessage })
                throw new Error(errorMessage)
            }
            return
        }

        notify({ type: 'success', text: data.message || 'Detail account type created successfully!' })

        router.push('/accounting/accounts/detailAccount')

    } catch (error: any) {
        console.error('Submission error:', error)
        if (!error.message.includes('Validation failed')) {
            notify({ type: 'error', text: error.message || 'An unexpected error occurred.' })
        }
    } finally {
        loading.value = false
    }
}
</script>