const API_BASE = import.meta.env.VITE_API_BASE_URL


export async function getAllJournalEntries() {
    const res = await fetch(`${API_BASE}/accounting/journal/entries`,{
        method: 'GET',
        headers: {'Accept':'application/json'}
    })

    const data = await res.json()

    return data
}