<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { getPermissionById, updatePermission } from '@/services/rbac/permissionService';

const router = useRouter()
const route = useRoute()

interface Permission {
    id: number,
    name: string,
    guard_name: string
}

const permData = ref<Permission>({
    id: 0,
    name: '',
    guard_name: ''
});

const fetchPerm = async (permId: number) => {
    const perm = await getPermissionById(permId)
    if (perm) {
        permData.value = perm.data
    }
}

const updatePerm = async () => {
    const res = await updatePermission(permData.value);
    if (res) {
        alert(res.message)
        router.push('/rbac/permissions')
    } else {
      alert('error updating')
    }
}


onMounted(async () => {
    const permId = Number(route.params.id)
    if (permId) {
        await fetchPerm(permId)
    }
})
</script>

<template>
    <VCard>
        <VCardTitle>Edit Permission</VCardTitle>
        <VCardItem>
            <VRow>
                <VCol cols="12" md="4">
                    <VTextField name="Permission name" v-model="permData.name" />
                </VCol>
                <VCol cols="12" md="4">
                    <VTextField name="Guard name" v-model="permData.guard_name" />
                </VCol>
            </VRow>
            <VRow>
                <VCol>
                    <VBtn @click="updatePerm">Save</VBtn>
                </VCol>
            </VRow>
        </VCardItem>
    </VCard>

</template>
