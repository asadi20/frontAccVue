const API_BASE_URL = 'http://localhost:8000/api';

// get All Account types from backend
export async function getAccountTypes() {
    const response = await fetch(`${API_BASE_URL}/accounting/account-types`, {
        method: 'GET',
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
        headers: {Accept: 'application/json'}
    });

    if(!response.ok){
        throw new Error('Failed to get account type show function from backend')
    }
    return await response.json();
}