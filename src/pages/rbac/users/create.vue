<script setup lang="ts">
import { useRouter } from 'vue-router';
import { createUser } from '@/services/rbac/userService';

const userData = reactive({
    user_name: '',
    name: '',
    email: '',
    password: ''
});

const router = useRouter();

const addUser = async() => {
    const res = await createUser(userData);
    if(res){
        alert(res.message);
        router.push('/rbac/users');
    }
}

</script>

<template>
    <VCard>
        <VCardTitle>Add User</VCardTitle>
        <VCardSubtitle>add users information and manage roles and permissions</VCardSubtitle>
        <VDivider />
        <VCardItem>
            <VRow>
                <VCol>
                    <VTextField label="User Name" v-model="userData.user_name"/>
                </VCol>
                <VCol>
                    <VTextField label="Full Name" v-model="userData.name" />
                </VCol>
                <VCol>
                    <VTextField label="E-Mail" v-model="userData.email" />
                </VCol>
                <VCol>
                    <VTextField label="Password" v-model="userData.password" />
                </VCol>
            </VRow>
        </VCardItem>
        <VCardActions>
            <VRow>
                <VCol>
                    <VBtn @click="addUser">Save</VBtn>
                </VCol>
            </VRow>
        </VCardActions>
    </VCard>
</template>