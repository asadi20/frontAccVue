<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllDetailAccount } from '@/services/detailAccountService';
const headers = [
    { title: 'ID', key: 'id' },
    { title: 'type_name', key: 'type_name' },
    { title: 'type_id', key: 'type_id' },
    { title: 'Code', key: 'code' },
    { title: 'Name', key: 'name' },
    { title: 'NationalID', key: 'national_id' },
    { title: 'Description', key: 'description' },
    { title: 'Actions', key: 'actions', sortable: false },
]


const items = ref([])
const loading = ref()
const router = useRouter()

onMounted(async ()=>{
    const response = await getAllDetailAccount()
    items.value = response.data
})

const editItem = (item: any) =>{
    router.push(`/accounting/accounts/detailAccount/${item.id}/edit`)
}
const deleteItem = (item: any)=>{
    alert('deleted some Items')
    // router.push(``)
}
</script>

<template>
    <VCard>
        <!-- Header -->
        <VCardItem>
            <div class="d-flex justify-space-between align-center w-100">
                <div>
                    <VCardTitle>Detail Account</VCardTitle>
                    <VCardSubtitle>
                        List of all detail accounts
                    </VCardSubtitle>
                </div>

                <VBtn color="primary" @click="router.push('/accounting/accounts/detailAccount/create')">
                    Create
                </VBtn>
            </div>
        </VCardItem>

        <VDivider />

        <!-- Table -->
        <VDataTable :headers="headers" :items="items" :loading="loading" class="text-no-wrap">
            <!-- actions -->
            <template #item.actions="{ item }">
                <VBtn size="small" color="primary" variant="text" @click="editItem(item)">
                    Edit
                </VBtn>

                <VBtn size="small" color="error" variant="text" @click="deleteItem(item)">
                    Delete
                </VBtn>
            </template>
        </VDataTable>
    </VCard>
</template>