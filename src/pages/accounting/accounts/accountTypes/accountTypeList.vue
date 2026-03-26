<script setup lang="ts">
import { useAccountTypeStore } from '@/stores/accountTypesStore'
const accountTypeStore = useAccountTypeStore()
const router = useRouter()


onMounted(() => {
  accountTypeStore.fetchAll()
})

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Slug', key: 'slug' },
  { title: 'desc', key: 'description' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const handleEdit = (item: any) => {
  console.log('Editing item:', item.target.id)
  // برای مثال: router.push(`/account-types/edit/${item.id}`)
}
const handleView = (item: any) => {
  //console.log(router.getRoutes())
  router.push({
    name: 'accounting-accounts-account-types-id-account-type-detail',
    params: { id: item.id }
  })
}
</script>

<template>
  <div>
    <VCard title="Account Types">
      <VCardText>List of all acount types with db.</VCardText>
      <VDataTable :headers="headers" :items="accountTypeStore.items" :items-per-page="10">
        <template #item.actions="{ item }">
          <VBtn color="primary" variant="text" @click="handleEdit(item)">
            <VIcon icon="tabler-edit" />
          </VBtn>
          <VBtn color="primary" variant="text" @click="handleView(item)">
            <VIcon icon="tabler-eye"></VIcon>
          </VBtn>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>
