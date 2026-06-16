<script setup lang="ts">
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { register } from '@/services/auth/authService'
import { useRouter } from 'vue-router'

const router = useRouter()
definePage({
    meta: {
        layout: 'blank',
        public: true,
    },
})

const form = ref({
    user_name: '',
    email: '',
    name: '',
    password: '',
    privacyPolicies: false,
})

const submitRegisterData = async () => {
    try {
        const res = await register(form.value)
        console.log(res)
        alert(res.message);
        if (res.error) {
            const message = Object.values(res.error).flat().join('\n');
            alert(message);
        }
        router.push('/')
    } catch (error) {
        console.log(error)
    }
}

const isPasswordVisible = ref(false)
</script>

<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <div class="position-relative my-sm-16">
            <!-- 👉 Top shape -->
            <VNodeRenderer :nodes="h('div', { innerHTML: authV1TopShape })"
                class="text-primary auth-v1-top-shape d-none d-sm-block" />

            <!-- 👉 Bottom shape -->
            <VNodeRenderer :nodes="h('div', { innerHTML: authV1BottomShape })"
                class="text-primary auth-v1-bottom-shape d-none d-sm-block" />

            <!-- 👉 Auth card -->
            <VCard class="auth-card" max-width="460" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardItem class="justify-center">
                    <VCardTitle>
                        <RouterLink to="/">
                            <div class="app-logo">
                                <VNodeRenderer :nodes="themeConfig.app.logo" />
                                <h1 class="app-logo-title">
                                    {{ themeConfig.app.title }}
                                </h1>
                            </div>
                        </RouterLink>
                    </VCardTitle>
                </VCardItem>

                <VCardText>
                    <h4 class="text-h4 mb-1">
                        Adventure starts here 🚀
                    </h4>
                    <p class="mb-0">
                        Make your app management easy and fun!
                    </p>
                </VCardText>

                <VCardText>
                    <VForm @submit.prevent="() => { }">
                        <VRow>
                            <!-- Username -->
                            <VCol cols="12">
                                <AppTextField v-model="form.user_name" autofocus label="Username" placeholder="John2" />
                            </VCol>
                            <!-- email -->
                            <VCol cols="12">
                                <AppTextField v-model="form.email" label="Email" type="email"
                                    placeholder="johndoe@email.com" />
                            </VCol>
                            <!-- name -->
                            <VCol cols="12">
                                <AppTextField v-model="form.name" label="Full Name" type="text"
                                    placeholder="john doe" />
                            </VCol>

                            <!-- password -->
                            <VCol cols="12">
                                <AppTextField v-model="form.password" label="Password" placeholder="············"
                                    :type="isPasswordVisible ? 'text' : 'password'" autocomplete="password"
                                    :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                                    @click:append-inner="isPasswordVisible = !isPasswordVisible" />

                                <div class="d-flex align-center my-6">
                                    <VCheckbox id="privacy-policy" v-model="form.privacyPolicies" inline />
                                    <VLabel for="privacy-policy" style="opacity: 1;">
                                        <span class="me-1 text-high-emphasis">I agree to</span>
                                        <a href="javascript:void(0)" class="text-primary">privacy policy & terms</a>
                                    </VLabel>
                                </div>

                                <VBtn block type="submit" @click="submitRegisterData">
                                    Sign up
                                </VBtn>
                            </VCol>

                            <!-- login instead -->
                            <VCol cols="12" class="text-center text-base">
                                <span>Already have an account?</span>
                                Sign in instead
                            </VCol>

                            <VCol cols="12" class="d-flex align-center">
                                <VDivider />
                                <span class="mx-4">or</span>
                                <VDivider />
                            </VCol>

                            <!-- auth providers -->
                            <VCol cols="12" class="text-center">
                                <AuthProvider />
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
