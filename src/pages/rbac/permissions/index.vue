<script setup lang="ts">
import { useRouter } from 'vue-router';

import { getAllPermissions } from '@/services/rbac/permissionService';

const headers = [
    {title:'ID', key:'id'},
    {title: 'permission name', key:'name'},
    {title: 'Guard name', key: 'guard_name'},
    {title: 'Actions', key: 'actions', sortable: false}
]

interface Permission {
    id: number,
    name: string,
    guard_name: string
}
const items = ref(<Permission[]>([]))

const router = useRouter()

const loadPerms = async () => {
    const res = await getAllPermissions();
    if(res){
        items.value= res.data
    }
}

const addPerm = () => {
    router.push('/rbac/permissions/create')
}

const editItem = async (item: number) => {
    router.push(`/rbac/permissions/${item}/edit`)
}

onMounted(async()=>{
    await loadPerms()
})

</script>

<template>
    <VCard>
        <VCardTitle>Permissions</VCardTitle>
        <VCardSubtitle>List of all permissions</VCardSubtitle>
        <VDivider />
        <VBtn @click="addPerm">+ Add permission</VBtn>
        <VDivider />
        <VCardItem>
            <VRow>
                <VDataTable :headers="headers" :items="items">
                    <template #item.actions="{item}">
                        <VBtn size="small" color="primary" variant="text" @click="editItem(item.id)">Edit</VBtn>
                        <VBtn>Delete</VBtn>
                    </template>
                </VDataTable>
            </VRow>
        </VCardItem>
    </VCard>
</template>