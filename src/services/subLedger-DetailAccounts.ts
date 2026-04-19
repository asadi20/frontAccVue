const API_BASE = import.meta.env.VITE_API_BASE_URL


export async function getAllSubLedgerWithDetailAccountTypeLinks() {
    const response = await fetch(`${API_BASE}/accounting/accounts/sub-ledgers/detail-accounts`,{
        method: 'GET',
        headers: {'Accept': 'application/json'}
    })

    const res = await response.json()
    return res
}
// linkDetailAccountTypeToSubLedger
export async function linkDetailAccountType(formData: any)
{
    const response = await fetch(`${API_BASE}/accounting/accounts/sub-ledgers/detail-accounts`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    const res = await response.json()
    return res
}