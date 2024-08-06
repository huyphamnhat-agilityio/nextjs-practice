export const fetchApi = async <T>(url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    method: options?.method || "GET",
    headers: options?.headers || {
      "Content-Type": "application/json",
    },
    body: options?.body,
    ...options,
  });

  if (response.ok) return response.json() as T;

  throw new Error(`Failed to fetch ${url}: ${response.status}`);
};
