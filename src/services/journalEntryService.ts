const API_BASE = import.meta.env.VITE_API_BASE_URL


export async function getAllJournalEntries() {
    const res = await fetch(`${API_BASE}/accounting/journal/entries`,{
        method: 'GET',
        headers: {'Accept':'application/json'}
    })

    const data = await res.json()

    return data
}

// get all accounts from Chart of accounts with level = 2
export async function getAllSubLedger() {
    const response = await fetch(`${API_BASE}/accounting/accounts/sub-ledgers`,{
        method: 'GET',
        headers: {  'Accept': 'application/json'}
    })

    const res = await response.json()
    return res.data;
}

export async function getAllDetailAccountsWithSubId(subId: number){
    const response = await fetch(`${API_BASE}/accounting/accounts/sub-ledgers/${subId}/detail-accounts`,{
        method: 'GET',
        headers: {'Accept': 'application/json'}
    })

    const res = await response.json()
    return res.data
}

export async function addJournalEntry(data: any){
    const response = await fetch(`${API_BASE}/accounting/journal/entries`,{
       method: 'POST',
       body: JSON.stringify(data),
       headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
       }
    });

    const res = await response.json()
    return res
}