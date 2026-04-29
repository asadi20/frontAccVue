<script setup lang="ts">
import { useRouter } from 'vue-router';

import { getAllPermissions } from '@/services/rbac/permissionService';

const headers = [
    {title:'ID', key:'id'},
    {title: 'permission name', key:'name'},
    {title: 'Guard name', key: 'guard_name'}
]

const items = ref([])

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

                </VDataTable>
            </VRow>
        </VCardItem>
    </VCard>
</template>