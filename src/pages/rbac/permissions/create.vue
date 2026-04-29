<script setup lang="ts">
import { useRouter } from 'vue-router';
import { createPermission } from '@/services/rbac/permissionService';

const permData = reactive({
    'name': '',
    'guard_name': ''
});

const router = useRouter();

const addPerm = async() => {
    const res = await createPermission(permData);
    if(res){
        alert(res.message);
        router.push('rbac-permissions');
    }
}

</script>

<template>
    <VCard>
        <VCardTitle>Create Permission</VCardTitle>
        <VCardSubtitle>add a Permission to the system.</VCardSubtitle>
        <VDivider />
        <VCardItem>
            <VRow>
                <VCol>
                    <VTextField label="permission name" v-model="permData.name" />
                </VCol>
                <VCol>
                    <VTextField label="guard name" v-model="permData.guard_name" />
                </VCol>
                <VCol>
                    <VBtn @click="addPerm">Save</VBtn>
                </VCol>
            </VRow>
        </VCardItem>
    </VCard>

</template>