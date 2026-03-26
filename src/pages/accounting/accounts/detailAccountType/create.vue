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
                    <VCol cols="12" md="4">
                        <VTextField
                            v-model="form.code"
                            label="Code"
                            placeholder="e.g. 1001"
                            variant="outlined"
                            density="comfortable"
                            :rules="[required]"
                            :error-messages="errors.code?.[0]"
                        />
                    </VCol>

                    <VCol cols="12" md="4">
                        <VTextField
                            v-model="form.name"
                            label="Name"
                            placeholder="Account name"
                            variant="outlined"
                            density="comfortable"
                            :rules="[required]"
                            :error-messages="errors.name?.[0]"
                        />
                    </VCol>

                    <VCol cols="12" md="4">
                        <VTextField
                            v-model="form.description"
                            label="Description"
                            placeholder="Optional description"
                            variant="outlined"
                            density="comfortable"
                            :error-messages="errors.description?.[0]"
                        />
                    </VCol>
                </VRow>
            </VForm>
        </VCardText>

        <VDivider />

        <VCardActions class="justify-end gap-3 pa-4">
            <VBtn color="secondary" variant="tonal" @click="resetForm">
                Reset
            </VBtn>

            <VBtn
                color="primary"
                :loading="loading"
                @click="submit"
            >
                Save
            </VBtn>
        </VCardActions>
    </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const notify = (options: { type: string; text: string }) => {
    console.log(`Notification [${options.type}]: ${options.text}`)
}

const router = useRouter() 

const formRef = ref<any>(null)
const loading = ref(false)
const errors = ref<Record<string, string[]>>({})

const form = ref({
    code: '',
    name: '',
    description: '',
})

const required = (v: string | undefined) => !!v || 'This field is required'

const resetForm = () => {
    form.value.code = ''
    form.value.name = ''
    form.value.description = ''
    errors.value = {}
    formRef.value?.resetValidation()
}

const API_BASE = import.meta.env.VITE_API_BASE_URL

const submit = async () => {
    errors.value = {}
    const { valid } = await formRef.value?.validate()
    if (!valid) {
        return
    }

    loading.value = true

    try {
        const response = await fetch(`${API_BASE}/accounting/detail-account-types`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(form.value),
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

        router.push('/accounting/detail-account-type')

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