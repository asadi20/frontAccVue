<script setup lang="ts">
import { VBtn, VTable } from 'vuetify/components'
import { useAccountTypeStore } from '@/stores/accountTypesStore'

const accountTypeStore = useAccountTypeStore()

onMounted(()=>{
  accountTypeStore.fetchAll()
})

const headers =[
  {title: 'Name', key:'name'},
  {title:'Slug', key:'slug'},
  {title:'desc', key:'description'}
]
</script>

<template>
  <div>
    <VCard title="Account Types">
      <VCardText>List of all acount types with db seed.</VCardText>
      <VCardText>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Expedita quod nihil, illo qui repudiandae tempora sunt optio vel accusamus ullam sed totam asperiores possimus!
        Quis officiis ducimus odit quas officia.
      </VCardText>
      <VDataTable :headers="headers" :items="accountTypeStore.items" :items-per-page="10" />
    </VCard>
  </div>
</template>
