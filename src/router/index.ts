import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/accounting/accounts/accountTypes',
    name: 'accounting-accounts-account-types-list',
    component: () =>
      import('@/pages/accounting/accounts/accountTypes/accountTypeList.vue'),
  },
  {
    path: '/accounting/accounts/accountTypes/:id',
    name: 'accounting-accounts-account-types-account-type-detail',
    component: () =>
      import('@/pages/accounting/accounts/accountTypes/accountTypeDetail.vue'),
    props: true, // ✅ مهم
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
