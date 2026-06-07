<script setup lang="ts">
import { Router } from 'vue-router';
import { getAllRoles } from '@/services/rbac/roleService';

const router = useRouter()
const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Role name', key: 'name' },
    { title: 'Guard name', key: 'guard_name' },
    { title: 'actions', key: 'actions', sortable: false }
];

interface Role {
    id: number,
    name: string,
    guard_name: string
}

const allRoles = ref<Role[]>([]);

const fetchAllRoles = async () => {
    const res = await getAllRoles();
    allRoles.value = res.data;
}

function addNewRole() {
    router.push('/rbac/roles/create');
}
const editItem = async (roleId: number) => {
    router.push(`/rbac/roles/${roleId}/edit`)
}

onMounted(() => {
    fetchAllRoles()
})


</script>

<template>
    <VCard>
        <VCardTitle>List of all Roles</VCardTitle>
        <VCardSubtitle>Manage all roles in the system.</VCardSubtitle>
        <VBtn @click="addNewRole()">+Add new Role</VBtn>
        <VDivider />
        <VCardItem>
            <VRow>
                <VDataTable :headers="headers" :items="allRoles">
                    <template #item.actions="{ item }">
                        <VBtn size="small" color="primary" variant="text" @click="editItem(item.id)">Edit</VBtn>

                    </template>
                </VDataTable>
            </VRow>
        </VCardItem>
    </VCard>

</template>