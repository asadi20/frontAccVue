<template>
  <VCard>
    <!-- Header -->
    <VCardItem>
      <div class="d-flex justify-space-between align-center w-100">
        <div>
          <VCardTitle>Detail Account Types</VCardTitle>
          <VCardSubtitle>
            List of all detail account types
          </VCardSubtitle>
        </div>

        <VBtn color="primary" @click="router.push('/accounting/accounts/detailAccountType/create')">
          Create
        </VBtn>
      </div>
    </VCardItem>

    <VDivider />

    <!-- Table -->
    <VDataTable :headers="headers" :items="items" :loading="loading" class="text-no-wrap">
      <!-- actions -->
      <template #item.actions="{ item }">
        <VBtn size="small" color="primary" variant="text" @click="editItem(item)">
          Edit
        </VBtn>

        <VBtn size="small" color="error" variant="text" @click="deleteItem(item)">
          Delete
        </VBtn>
      </template>
    </VDataTable>
  </VCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const API_BASE = import.meta.env.VITE_API_BASE_URL

const loading = ref(false)

const items = ref<any[]>([])

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Code', key: 'code' },
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const fetchItems = async () => {
  loading.value = true

  try {
    const response = await fetch(`${API_BASE}/accounting/accounts/detail-account-types`, {
      headers: {
        Accept: 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch data')
    }

    items.value = data.data ?? data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const editItem = (item: any) => {
  router.push(`/accounting/accounts/detailAccountType/${item.id}/edit`)
}

const deleteItem = async (item: any) => {
  if (!confirm('Are you sure you want to delete this item?')) return

  try {
    const response = await fetch(
      `${API_BASE}/accounting/accounts/detailAccountType/${item.id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Delete failed')
    }

    fetchItems()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchItems()
})
</script>
