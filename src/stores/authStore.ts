import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null as any,
        initialized: false,
    }),
    getters: {
        isAuthenticated(state) {
            return !!state.user
        },
    },

    actions: {
        async fetchUser() {
            try {
                const res = await fetch('/api/user', {
                    credentials: 'include', // critical for sanctum
                })

                if (!res.ok) {
                    this.user = null
                } else {
                    const data = await res.json()
                    this.user = data
                }
            } catch (error) {
                this.user = null
            } finally {
                this.initialized = true
            }
        },

        can(permission: string) {
            return this.user?.permissions?.includes(permission) ?? false
        },

        hasRole(role: string) {
            return this.user?.roles?.includes(role) ?? false
        },

        hasAnyPermission(permissions: string[]) {
            return permissions.some(p => this.can(p))
        },
    },
})