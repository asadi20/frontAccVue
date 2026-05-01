const API_BASE_URL = 'http://localhost:8000/api';

export const getAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/rbac/users`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    const res = await response.json();
    return res;
}

export const createUser = async (userData :any) => {
    const response = await fetch(`${API_BASE_URL}/rbac/users`,{
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