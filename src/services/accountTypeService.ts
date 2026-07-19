const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_BASE_URL

// get All Account types from backend
export async function getAccountTypes() {
    const response = await fetch(`${API_BASE_URL}/accounting/account-types`, {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch account types')
    }
    return await response.json();
}

export async function getAccountTypeDetail(id: number) {
    const response = await fetch(`${API_BASE_URL}/accounting/account-types/${id}`,{
        method: 'GET',
        credentials: 'include',
        headers: {Accept: 'application/json'}
    });

    if(!response.ok){
        throw new Error('Failed to get account type show function from backend')
    }
    return await response.json();
}
