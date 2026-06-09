<route lang="yaml">
meta:
  requiresAuth: true
  permissions: ['users.read']
</route>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getAllUsers } from '@/services/rbac/userService';

const router = useRouter()
const headers = [
    { title: 'ID', key: 'id' },
    { title: 'User Name', key: 'user_name' },
    { title: 'Name', key: 'name' },
    { title: 'E-Mail', key: 'email' },
    { title: 'Created at', key: 'created_at' },
    { title: 'Updated at', key: 'updated_at' },
    { title: 'Actions', key: 'actions', sortable: false }
]

const items = ref([])

const loadAllUsers = async () => {
    const res = await getAllUsers();
    if (res) {
        items.value = res.data
    }
}

const editItem = async (item: any) => {
    router.push(`/rbac/users/${item.id}/edit`)
}

onMounted(async () => {
    await loadAllUsers();
})

</script>

<template>
    <VCard>
        <VCardTitle>Users</VCardTitle>
        <VCardSubtitle>Manage all users role and permissions.</VCardSubtitle>
        <VDivider />
        <VCardItem>
            <VDataTable :headers="headers" :items="items">
                <template #item.actions="{ item }">
                    <VBtn size="small" color="primary" variant="text" @click="editItem(item)">Edit</VBtn>
                    <VBtn>Delete</VBtn>
                </template>
            </VDataTable>
        </VCardItem>
    </VCard>

</template>