import { defineStore } from "pinia";
import { getAccountTypeDetail, getAccountTypes } from "@/services/accountTypeService";

export const useAccountTypeStore = defineStore('accountTypesStore',{
    state: () => ({
        items: [] as any[],
        loading: false,
    }),

    actions: {
        async fetchAll() {
            this.loading = true
            this.items = await getAccountTypes()
            this.loading = false
        },
    },
})

export const useAccountTypeDetailStore = defineStore('accountTypeDetailStore',{
    state: () =>({
        item: null as any | null,
        loading: false,
    }),
    actions: {
        async fetchById(id: number){
            this.loading = true
            this.item = await getAccountTypeDetail(id)
            this.loading = false
        }
    }
})