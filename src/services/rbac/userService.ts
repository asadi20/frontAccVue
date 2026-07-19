const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_BASE_URL

export const getAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/rbac/users`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const res = await response.json();
    return res;
}

export const createUser = async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/rbac/users`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const res = await response.json();
    return res

}

export const getUserById = async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/rbac/users/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const res = await response.json();

    if (res) {
        return res;
    }
}


export const getRolesByUser = async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/rbac/users/${userId}/roles`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        }
    })

    const res = await response.json();
    return res;

}

export const updateUserWithRoles = async (userId: number, userData: any) => {
    const response = await fetch(`${API_BASE_URL}/rbac/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const res = await response.json();
    return res;
}
