<template>
    <VCard>
        <VCardItem>
            <VCardTitle>Edit Detail Account Type</VCardTitle>
            <VCardSubtitle>Update detail account type with desired information.</VCardSubtitle>
        </VCardItem>
        <VDivider />

        <VCardText>
            <VForm>
                <VRow>
                    <VCol cols="12" md="4">
                        <VTextField v-model="form.code" label="Code" placeholder="e.g. 1001" variant="outlined" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model="form.name" label="name" placeholder="e.g. customers" variant="outlined"
                            density="comfortable" />
                    </VCol>
                    <VCol cols="12" md="4" xl="3">
                        <VTextField v-model="form.description" label="Description" placeholder="optional description"
                            variant="outlined" />
                    </VCol>
                </VRow>
            </VForm>
        </VCardText>
        <VDivider />
        <VCardActions class="justify-end gap-3 pa-4">
            <VBtn color="secondary" variant="tonal" @click="cancelForm">
                Cancel
            </VBtn>
            <VBtn color="primary" :loading="loading" @click="submit">
                Update
            </VBtn>

        </VCardActions>
    </VCard>

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getDetailAccountTypeById } from '@/services/detailAccountTypeService'

const router = useRouter()
const route = useRoute()
const loading = ref(false)

const API_BASE = import.meta.env.VITE_API_BASE_URL

const form = reactive({
    code: '',
    name: '',
    description: '',
})

const detailId = Number(route.params.id)

onMounted(async () => {
    
    if (detailId) {
        const res = await getDetailAccountTypeById(detailId)
        form.code = res.data.code
        form.name = res.data.name
        form.description = res.data.description ?? ''
    }
})


const cancelForm = () => {
    router.push('/accounting/accounts/detailAccountType')
}

const submit = async () => {
    loading.value= true
    try {
        const response = await fetch(`${API_BASE}/accounting/accounts/detail-account-types/${detailId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(form),
        })
        const data = await response.json()
        if (!response.ok) {
            //complete not ok
            console.log(data)
        }

        // use notify to alert successfull message
    } catch (error: any) {
        console.error('submission error:', error)
    } finally {
        loading.value = false
    }
}
</script>