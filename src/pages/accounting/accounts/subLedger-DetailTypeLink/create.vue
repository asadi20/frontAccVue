<script setup lang="ts">
import { linkDetailAccountType } from '@/services/subLedger-DetailAccounts';
import { useRouter } from 'vue-router';

const form = reactive({
    account_id: '',
    type_id: ''
})
const router = useRouter()
const submit = async () => {
    const res = await linkDetailAccountType(form);
    alert(res);
    if(res.success){
        router.push('accounting-accounts-sub-ledger-detail-type-link')
    }
}
</script>

<template>
    <VCard>
        <VCardItem>
            <VCardTitle>Add new link</VCardTitle>
            <VCardSubtitle>links between account and detail account type</VCardSubtitle>
        </VCardItem>
        <VDivider />
        <VCardText>
            <Vform>
                <VRow>
                    <VCol>
                        <VTextField label="subLedger account id" v-model="form.account_id" />
                    </VCol>
                    <VCol>
                        <VTextField label="detail type_id" v-model="form.type_id" />
                    </VCol>
                </VRow>
                <VRow>
                    <VCol>
                        <VBtn @click="submit">Submit </VBtn>
                    </VCol>

                </VRow>
            </Vform>

        </VCardText>
    </VCard>
</template>