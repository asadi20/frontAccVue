const API_BASE_URL = 'http://localhost:8000/api';
const BASE_URL = 'http://localhost:8000'

// login method

export const login = async (userData: any) => {
    try {
        await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
            method: 'GET',
            credentials: 'include'
        })

        const xsrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : ''
            },
            credentials: 'include'
        })

        return await response.json()
    } catch (error) {
        throw error
    }
}

// Register Method.
export const register = async (userData: any) => {
    try {
        await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
            method: 'GET',
            credentials: 'include'
        });
        const xsrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : ''
            },
            body: JSON.stringify(userData),
        })

        const res = await response.json()
        return res
    } catch (error) {
        throw error
    }
}