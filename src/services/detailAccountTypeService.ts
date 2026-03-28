const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function getDetailAccountTypeById(id: Number) {
    const response = await fetch(`${API_BASE}/accounting/accounts/detail-account-types/${id}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })

    const data = response.json()

    return data
}

export async function getAllDetailAccountType() {
    const response = await fetch(`${API_BASE}/accounting/accounts/detail-account-type`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    const data = await response.json()
    return data
}