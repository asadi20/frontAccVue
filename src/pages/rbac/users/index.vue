<script setup lang="ts">
import { getAllUsers } from '@/services/rbac/userService';
const headers = [
    { title: 'ID', key: 'id' },
    { title: 'User Name', key: 'user_name' },
    { title: 'Name', key: 'name' },
    { title: 'E-Mail', key: 'email' },
    { title: 'Created at', key: 'created_at' },
    { title: 'Updated at', key: 'updated_at' }
]

const items = ref([])

const loadAllUsers = async () => {
    const res = await getAllUsers();
    if (res) {
        items.value = res.data
    }
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
            </VDataTable>
        </VCardItem>
    </VCard>

</template>