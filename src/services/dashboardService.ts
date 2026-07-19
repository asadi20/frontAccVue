const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_BASE_URL

export const getDashStats = async () => {
  const response = await fetch(`${API_BASE_URL}/dash_stats`,{
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
  })

  const res = await response.json();

  return res
}
