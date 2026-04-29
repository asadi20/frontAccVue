const API_BASE_URL = 'http://localhost:8000/api';

export const getAllPermissions = async () => {
    const response = await fetch(`${API_BASE_URL}/rbac/permissions`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'appliaction/json'
        }
    })

    const res = await response.json()
    return res
}

export const createPermission = async (data :any) => {
    const response = await fetch(`${API_BASE_URL}/rbac/permissions`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'appliaction/json'
        }
    })

    const res = await response.json();

    return res
}