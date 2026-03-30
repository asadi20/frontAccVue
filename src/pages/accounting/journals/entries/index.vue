<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getAllJournalEntries } from '@/services/journalEntryService';
const router = useRouter()

const journals = ref([])
const headers = [
    { title: 'ID', key: 'id' },
    { title: 'document_number', key: 'document_number' },
    { title: 'entry_date', key: 'entry_date' },
    { title: 'total_debit', key: 'total_debit' },
    { title: 'total_credit', key: 'total_credit' },
    { title: 'status', key: 'status' },
    { title: 'Description', key: 'Description' },
    { title: 'Actions', key: 'actions', sortable: false },
]
const loadAllEntries = async () => {
    const res = await getAllJournalEntries()
    journals.value = res.data
}

const loading = ref()
onMounted(() => {
    loadAllEntries()
})


</script>

<template>
    <VCard>
        <VCardItem>
            <div class="d-flex justify-space-between align-center w-100">
                <div>
                    <VCardTitle>Journal Entries</VCardTitle>
                    <VCardSubtitle>List of all journal_entries</VCardSubtitle>
                </div>
                <VBtn color="primary" @click="router.push('/accounting/journals/entries/create')">+ Add new Journal</VBtn>
            </div>
        </VCardItem>
        <VDivider />
        <VDataTable :headers="headers" :items="journals" :loading="loading" class="text-no-wrap">

        </VDataTable>
    </VCard>
</template>