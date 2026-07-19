<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script setup lang="ts">

import { getDashStats } from '@/services/dashboardService'

type DashboardStatApiItem = {
  title: string,
  amount: number
}

type DashStat = {
  title: string,
  stats: string,
  icon: string,
  color: string
}

const dashboardMeta = {
  user: {
    icon: 'tabler-users',
    color: 'primary',
    title: 'Users',
  },
  sell: {
    icon: 'tabler-basket-up',
    color: 'success',
    title: 'Sales',
  },
  document: {
    icon: 'tabler-file',
    color: 'error',
    title: 'Documents',
  },
  employee: {
    icon: 'tabler-users-group',
    color: 'primary',
    title: 'Employee'
  }
} as const

const dash_stats = ref<DashStat[]>([])

const transformDashboardStats = (data: Record<string, DashboardStatApiItem>): DashStat[] => {
  return Object.entries(data).map(([key, value]) => {
    const meta = dashboardMeta[key as keyof typeof dashboardMeta]

    return {
      title: meta?.title ?? value.title,
      stats: String(value.amount),
      icon: meta?.icon ?? 'tabler-chart-bar',
      color: meta?.color ?? 'secondary',
    }
  })
}

onMounted(async () => {
  const response = await getDashStats()

  dash_stats.value = transformDashboardStats(response.data)
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
