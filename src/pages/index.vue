<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script setup lang="ts">
const dash_stats = ref([
  {
    title: 'users',
    stats: '3',
    icon: 'tabler-users',
    color: 'primary',
  },
  {
    title: 'Documents',
    stats: '120',
    icon: 'tabler-file',
    color: 'error'
  },
  {
    title: 'Sales',
    stats: '230M',
    icon: 'tabler-basket-up',
    color: 'success'
  },
  {
    title: 'Buys',
    stats: '220M',
    icon: 'tabler-basket-down',
    color: 'error'
  },
  {
    title: 'Employee',
    stats: '10',
    icon: 'tabler-users-group',
    color: 'primary'
  }
])

onMounted(async () => {
  const response = await fetch(`/api/dash_stats`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })

  const res = await response.json()
  dash_stats.value = res.data
})

</script>

<template>
  <VCard title="Stats">
    <VCardText>
      <VRow>
        <VCol cols="6" md="3" v-for="item in dash_stats" :key="item.title">
          <div class="d-flex align-center gap-4 mt-md-9 mt-0">
            <VAvatar :color="item.color" variant="tonal" rounded size="40">
              <VIcon :icon="item.icon" />
            </VAvatar>
            <div class="d-flex flex-column">
              <h5 class="text-h5">
                {{ item.stats }}
              </h5>
              <div class="text-sm">
                {{ item.title }}
              </div>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
