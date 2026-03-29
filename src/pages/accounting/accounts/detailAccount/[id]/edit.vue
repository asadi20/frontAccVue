<script setup lang="ts">
import { updateDetailAccountById, getDetailAccountById } from '@/services/detailAccountService';
import { getAllDetailAccountType } from '@/services/detailAccountTypeService';
import { useRoute } from 'vue-router';
const route = useRoute()

const form = reactive({
    code: '',
    name: '',
    type_id: null,
    national_id: '',
    description: ''
})

const detailId = Number(route.params.id)

const submit = async () => {
    const res = await updateDetailAccountById(detailId, form)
    alert(res.message)
}

const types = ref([])

const loadDetailtypes = async () => {
    const res = await getAllDetailAccountType();
    types.value = res.data
}

const loadDetailAccount = async (detailId: number) => {
    const res = await getDetailAccountById(detailId)
    Object.assign(form, res.data)
    //form.code = res.data.code
    //form.name = res.data.name
    //form.type_id = res.data.type_id
    //form.type_name = res.data.type_name
    //form.national_id = res.data.national_id
    //form.description = res.data.description
}

onMounted(() => {
    loadDetailtypes()
    loadDetailAccount(detailId)
})
</script>

<template>
    <VCard>
        <VCardItem>
            <VCardTitle>Update Detail Account</VCardTitle>
            <VCardSubtitle>Fill the form with valid data!</VCardSubtitle>
        </VCardItem>
        <VDivider />
        <VCardText>
            <VForm>
                <VRow>
                    <VCol>
                        <VTextField label="code" v-model="form.code" />
                    </VCol>
                    <VCol>
                        <VTextField label="name" v-model="form.name" />
                    </VCol>
                    <VCol>
                        <VSelect v-model="form.type_id" :items="types" item-title="name" item-value="id"
                            label="detail-type" />
                    </VCol>
                    <VCol>
                        <VTextField label="national_id" v-model="form.national_id" />
                    </VCol>
                    <VCol>
                        <VTextField label="description" v-model="form.description" />
                    </VCol>
                </VRow>
            </VForm>
        </VCardText>
        <VDivider />
        <VCardActions>
            <VBtn color="primary" @click="submit">Update</VBtn>
            <VBtn color="secondary">Cancel</VBtn>
        </VCardActions>
    </VCard>
</template>