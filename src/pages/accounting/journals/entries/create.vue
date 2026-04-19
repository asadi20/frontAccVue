<script setup>

import { reactive, ref } from 'vue'
import { getAllSubLedger, getAllDetailAccountsWithSubId, addJournalEntry } from '@/services/journalEntryService'

const form = reactive({
  document_number: '',
  entry_date: '',
  description: '',
})

const lineEditor = reactive({
  account_id: null,
  detail_account_id: null,
  description: '',
  debit: 0,
  credit: 0
})

const lines = ref([])

const editingIndex = ref(null)

function resetEditor() {
  lineEditor.account_id = null
  lineEditor.detail_account_id = null
  lineEditor.description = ''
  lineEditor.debit = 0
  lineEditor.credit = 0
  editingIndex.value = null
}
const accounts = ref([])
async function loadCOA() {
  const subLedgers = await getAllSubLedger()
  accounts.value = subLedgers
}

const detailAccounts = ref([])


// detaiil account selector watch
watch(
  ()=>lineEditor.account_id,
  async(accountId)=> {
    if(!accountId){
      detailAccounts.value = []
      return
    }

    const data = await getAllDetailAccountsWithSubId(accountId)
    detailAccounts.value = data

    //reset detail selector
    lineEditor.detail_account_id = null

  }
)

function addLine() {

  if (editingIndex.value !== null) {

    lines.value[editingIndex.value] = { ...lineEditor }

  } else {

    lines.value.push({ ...lineEditor })

  }

  resetEditor()
}

function editLine(index) {

  Object.assign(lineEditor, lines.value[index])

  editingIndex.value = index
}

function deleteLine(index) {

  lines.value.splice(index, 1)

}

const totalDebit = computed(() => {

  return lines.value.reduce((s, l) => s + Number(l.debit || 0), 0)

})

const totalCredit = computed(() => {

  return lines.value.reduce((s, l) => s + Number(l.credit || 0), 0)

})

async function addJournal() {
  const payload = {
    ...form,
    lines: [...lines.value]
  }

  const res = await addJournalEntry(payload)
  alert(res.message)
}

onMounted(() => {
  loadCOA()
})

</script>


<template>

  <VCard>

    <VCardItem>
      <VCardTitle>Journal Entry</VCardTitle>
    </VCardItem>

    <VDivider />

    <!-- HEADER -->

    <VCardText>

      <VRow>

        <VCol cols="12" md="4">
          <VTextField v-model="form.document_number" label="Document Number" />
        </VCol>

        <VCol cols="12" md="4">
          <VTextField v-model="form.entry_date" label="Entry Datee" />
        </VCol>

        <VCol cols="12" md="4">
          <VTextField v-model="form.description" label="Description" />
        </VCol>
        <VCol cols="12" md="4">
          <VBtn @click="addJournal"> Save Journal</VBtn>

        </VCol>

      </VRow>

    </VCardText>

    <VDivider />

    <!-- LINE EDITOR -->

    <VCardText>

      <h4 class="mb-4">Add / Edit Line</h4>

      <VRow>

        <VCol md="3">
          <VAutocomplete v-model="lineEditor.account_id" :items="accounts"
            :item-title="item => `${item.code} - ${item.name}`" item-value="id" label="Account" />
        </VCol>

        <VCol md="3">
          <VAutocomplete v-model="lineEditor.detail_account_id" :items="detailAccounts" item-title="name"
            item-value="id" label="Detail" />
        </VCol>

        <VCol md="3">
          <VTextField v-model="lineEditor.description" label="Description" />
        </VCol>

        <VCol md="1.5">
          <VTextField v-model="lineEditor.debit" type="number" label="Debit" />
        </VCol>

        <VCol md="1.5">
          <VTextField v-model="lineEditor.credit" type="number" label="Credit" />
        </VCol>

        <VCol md="1">

          <VBtn color="primary" block @click="addLine">

            {{ editingIndex !== null ? 'Update' : 'Add' }}

          </VBtn>

        </VCol>

      </VRow>

    </VCardText>

    <VDivider />

    <!-- TABLE -->

    <VCardText>

      <VTable>

        <thead>

          <tr>
            <th>Account</th>
            <th>Detail</th>
            <th>Description</th>
            <th>Debit</th>
            <th>Credit</th>
            <th></th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="(line, i) in lines" :key="i">

            <td>{{ line.account_id }}</td>

            <td>{{ line.detail_account_id }}</td>

            <td>{{ line.description }}</td>

            <td>{{ line.debit }}</td>

            <td>{{ line.credit }}</td>

            <td>

              <VBtn icon="tabler-edit" variant="text" @click="editLine(i)" />

              <VBtn icon="tabler-trash" variant="text" color="error" @click="deleteLine(i)" />

            </td>

          </tr>

        </tbody>

      </VTable>

    </VCardText>

    <VDivider />

    <VCardText class="d-flex justify-end">

      <div class="mr-6">
        Debit: {{ totalDebit }}
      </div>

      <div>
        Credit: {{ totalCredit }}
      </div>

    </VCardText>

  </VCard>

</template>
