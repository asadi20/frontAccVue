<script setup lang="ts">

import { createRole } from '@/services/rbac/roleService';

const roleData = reactive({
    'name': '',
    'guard_name': '',
});

const saveForm = async () => {
    const response = await createRole(roleData);

    if(response){
        alert(response.message);
    }
}



</script>

<template>
    <VCard>
        <VCardTitle> Add new Role</VCardTitle>
        <VCardSubtitle>create new role for user management</VCardSubtitle>
        <VDivider />
        <VCardItem>
            <VForm>
                <VRow>
                    <VCol>
                        <VTextField label="Role Name" v-model="roleData.name" />
                    </VCol>
                    <VCol>
                        <VTextField label="guard name" v-model="roleData.guard_name" />
                    </VCol>
                </VRow>
                <VRow>
                    <VCol>
                        <VBtn @click="saveForm()">Save</VBtn>
                    </VCol>
                </VRow>
            </VForm>

        </VCardItem>

    </VCard>
</template>