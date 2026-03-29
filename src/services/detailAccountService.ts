const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function getAllDetailAccount() {
    const response = await fetch(`${API_BASE}/accounting/accounts/detail-accounts`, {
        method: 'GET',
        headers: { 'Accept': 'Application/json' },
    })

    const data = await response.json()

    return data
}

export async function getDetailAccountById(id: number){
    const response = await fetch(`${API_BASE}/accounting/accounts/detail-accounts/${id}`,{
        method: 'GET',
        headers: {'Accept': 'application/json'}
    })

    const data = await response.json()

    return data
}

export async function updateDetailAccountById(id: number, data: any){
    const response = await fetch(`${API_BASE}/accounting/accounts/detail-accounts/${id}`,{
        method: 'PUT',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const res = await response.json()
    return res
}