const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_BASE_URL


export const getAllPermissions = async () => {
  const response = await fetch(`${API_BASE_URL}/rbac/permissions`, {
    method: "GET",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();
  return res;
};

export const getPermissionById = async (permId: number) => {
  const response = await fetch(`${API_BASE_URL}/rbac/permissions/${permId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });

  const res = await response.json();

  return res;
};

export const createPermission = async (data: any) => {
  await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });
  const xsrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  const response = await fetch(`${API_BASE_URL}/rbac/permissions`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-XSRF-TOKEN": xsrfToken ? decodeURIComponent(xsrfToken) : "",
    },
  });

  const res = await response.json();

  return res;
};

export const updatePermission = async (data: any) => {
  try {
    await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include",
    });
    const xsrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    const res = await fetch(`${API_BASE_URL}/rbac/permissions/${data.id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": xsrfToken ? decodeURIComponent(xsrfToken) : "",
      },
    });

    const response = await res.json();
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
