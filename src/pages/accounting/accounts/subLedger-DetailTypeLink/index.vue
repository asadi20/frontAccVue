<script setup lang="ts">
import { getAllSubLedgerWithDetailAccountTypeLinks } from '@/services/subLedger-DetailAccounts';
import { useRouter } from 'vue-router';


const headers = [
    { title: 'کد حساب معین', key: 'account.code' },
    { title: 'نام حساب معین', key: 'account.name' },
    { title: 'کد حساب تفصیلی', key: 'detail_type.code' },
    { title: 'نام حساب تفصیلی', key: 'detail_type.name' }
]

const links = ref([])

const loadDetails = async () => {
    const res = await getAllSubLedgerWithDetailAccountTypeLinks();
    links.value = res.data
}

onMounted(async () => {
    await loadDetails()
})

const router = useRouter()

function newBtn() {
    router.push({name:'accounting-accounts-sub-ledger-detail-type-link-create'})
}

</script>

<template>
    <VCard>
        <VCardItem>
            <VCardTitle>ارتباطات حسابهای معین</VCardTitle>
            <VCardSubtitle>ارتباط حسابهای معین با نوع حساب تفصیلی</VCardSubtitle>
            <VBtn @click="newBtn"> + Add new link</VBtn>
        </VCardItem>
        <VCardText>
            <VDataTable :headers="headers" :items="links" class="text-no-wrap">

            </VDataTable>
        </VCardText>
    </VCard>

</template>