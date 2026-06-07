<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getRoleById, updateRoleWithPermissions } from '@/services/rbac/roleService';


interface Permission {
    id: number,
    name: string,
    gurad_name: string
}

interface Role {
    id: number,
    name: string,
    guard_name: string,
    permissions: Permission[]
}

interface RoleResponse {
    rolePerms: Role,
    perms: Permission[]
}

const roleData = ref<Role | null>(null);
const allPermissions = ref<Permission[]>([]);
const selectedPermissionId = ref<number[]>([])

const getRole = async (roleId: number) => {
    try {
        //const res = await getRoleById(roleId);
        const res = await getRoleById(roleId) as { data: RoleResponse };
        roleData.value = res.data.rolePerms;
        allPermissions.value = res.data.perms;

        if (roleData.value && roleData.value.permissions) {
            selectedPermissionId.value = res.data.rolePerms.permissions.map(p => p.id)
        }
    } catch (error) {
        alert(error)
    }
}

const updateRole = async() => {
    const roleId = Number(route.params.id)
    const rolePermsData = {
        name: roleData.value?.name,
        guard_name: roleData.value?.guard_name,
        permIds: selectedPermissionId.value
    }
    try{
        const res = await updateRoleWithPermissions(roleId, rolePermsData);
        alert(res.message);
    } catch(error){
        alert(error);
    }

}

const router = useRoute();
const route = useRoute();

onMounted(async () => {
    const roleId = route.params.id;
    await getRole(Number(roleId))
})


</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardTitle>Edit Role</VCardTitle>
                <VCardSubtitle>Mnagae this role and assign some permissions to it.</VCardSubtitle>
                <VCardItem v-if="roleData">
                    <VRow>
                        <VCol cols="12" md="4">
                            <VTextField label="Role Name" v-model="roleData.name" />
                        </VCol>
                        <VCol>
                            <VTextField label="Guard Name" v-model="roleData.guard_name" />
                        </VCol>
                    </VRow>
                </VCardItem>
                <VCardActions>

                </VCardActions>
            </VCard>
        </VCol>
        <VCol cols="12">
            <VCard>
                <VCardTitle>all permissions</VCardTitle>
                <VCardSubtitle>all permissions that attached to this user</VCardSubtitle>
                <VCardItem v-if="allPermissions">
                    <VRow>
                        <VCol v-for="perm in allPermissions" :key="perm.id" cols="12" md="4">
                            <VCheckbox v-model="selectedPermissionId" :label="perm.name" :value="perm.id" />
                        </VCol>
                    </VRow>
                </VCardItem>
                <VCardActions>
                    <VRow>
                        <VCol>
                            <VBtn @click="updateRole">Update</VBtn>
                        </VCol>
                    </VRow>
                </VCardActions>
            </VCard>
        </VCol>
    </VRow>
</template>