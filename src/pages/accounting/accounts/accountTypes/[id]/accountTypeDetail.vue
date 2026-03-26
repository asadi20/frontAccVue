<script setup lang="ts">
import { useAccountTypeDetailStore } from '@/stores/accountTypesStore';
import { useRoute } from 'vue-router';


const store = useAccountTypeDetailStore()
const route = useRoute()

onMounted(()=>{
    const id = Number(route.params.id)
    if (id) store.fetchById(id)
})

</script>

<template>
    <div>
        asaddd
    </div>
    <div v-if="store.loading">Loading...</div>
    <div v-else-if="store.item">
        {{  store.item.name }}
    </div>
</template>