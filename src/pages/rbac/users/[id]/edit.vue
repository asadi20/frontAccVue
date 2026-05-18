<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { getRolesByUser, updateUserWithRoles } from '@/services/rbac/userService';


const router = useRouter();
const route = useRoute();

const userData = reactive({
    id: '',
    user_name: '',
    name: '',
    email: '',
    roleIds: [] as number[],
});

interface Role {
    id: number,
    name: string,
    guard_name: string
}

//const rolesData = reactive({id:'',name:'',guard_name:''});

const rolesData = ref<Role[]>([]);
const allRoles = ref<Role[]>([]);
const selectedRole = ref<number | null>(null);

const fetchUserRoles = async (userId: number) => {
    const res = await getRolesByUser(userId);
    //Object.assign(rolesData, res.data.roles);
    allRoles.value = res.data.roles;
    rolesData.value = res.data.userData.roles;
    Object.assign(userData, res.data.userData)
    userData.roleIds = res.data.userData.roles.map((role: Role) => role.id)
}

const saveForm = async () => {
    const res = await updateUserWithRoles(Number(route.params.id), userData);
    if (res) {
        alert('OK');
        console.log(res)
    }
}

onMounted(async () => {
    const userId = Number(route.params.id);
    if (userId) {
        await fetchUserRoles(userId);
    }

})

</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardTitle>Edit user information</VCardTitle>
                <VCardSubtitle>assign roles and permissions to this user</VCardSubtitle>
                <VDivider />
                <VCardItem>
                    <VRow>
                        <VCol>
                            <VTextField label="User Name" v-model="userData.user_name" />
                        </VCol>
                        <VCol>
                            <VTextField label="User Name" v-model="userData.name" />
                        </VCol>
                        <VCol>
                            <VTextField label="User Name" v-model="userData.email" />
                        </VCol>
                    </VRow>
                </VCardItem>
                <VCardActions>
                    <VBtn color="primary" @click="saveForm">Save</VBtn>
                    <VBtn color="outline">Cancel</VBtn>
                </VCardActions>
            </VCard>
        </VCol>
        <VCol cols="12">
            <VCard>
                <VCardTitle>Roles</VCardTitle>
                <VCardSubtitle>all roles links to this user</VCardSubtitle>
                <VCardItem>
                    <VRow>
                        <VCol v-for="role in allRoles" :key="role.id" cols="12" md="4">
                            <VCheckbox v-model="userData.roleIds" :label="`${role.name} (${role.guard_name})`"
                                :value="role.id" />
                        </VCol>
                    </VRow>
                </VCardItem>
            </VCard>
        </VCol>
    </VRow>
</template>