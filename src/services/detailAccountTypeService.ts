const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getDetailAccountTypeById(id: Number) {
  const response = await fetch(
    `${API_BASE_URL}/accounting/accounts/detail-account-types/${id}`,
    {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    },
  );

  const data = response.json();

  return data;
}

export async function getAllDetailAccountType() {
  const response = await fetch(
    `${API_BASE_URL}/accounting/accounts/detail-account-types`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    },
  );

  const data = await response.json();
  return data;
}

export async function getAllSubLedgerWithDetailAccountTypeLinks() {
  const response = await fetch(
    `${API_BASE_URL}/accounting/accounts/sub-ledgers/detail-accounts`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    },
  );

  const data = await response.json();
  return data;
}
