<script setup lang="ts">
import { Router } from 'vue-router';
import { getAllRoles } from '@/services/rbac/roleService';

const router = useRouter()
const headers = [
    {title: 'ID', key: 'id'},
    {title: 'Role name', key: 'name'},
    {title: 'Guard name', key: 'guard_name'}
];

const allRoles = ref([]);

const fetchAllRoles = async () => {
    const res = await getAllRoles();
    allRoles.value = res.data;
}

function addNewRole(){
    router.push('/rbac/roles/create');
}

onMounted(()=>{
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

            </VDataTable>
        </VRow>
        </VCardItem>
    </VCard>

</template>