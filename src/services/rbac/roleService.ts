const API_BASE_URL = 'http://localhost:8000/api';

// get All Roles
export const getAllRoles = async () => {
    const response = await fetch(`${API_BASE_URL}/rbac/roles`,{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'aaplication/json'
        }
    })

    const res = await response.json()
    return res
}

export const createRole = async (data: any) =>{
    const response = await fetch(`${API_BASE_URL}/rbac/roles`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const res = response.json()
    return res
}