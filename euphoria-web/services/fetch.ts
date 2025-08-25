import { cookies } from "next/headers";

export const fetchApi = async <T>(url: string, options?: RequestInit) => {
  const headerOption: HeadersInit = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };

  const response = await fetch(url, {
    method: options?.method ?? "GET",
    headers: {
      ...headerOption,
      ...options?.headers,
    },
    body: options?.body,
    ...options,
  });

  if (response.ok) {
    return (await response.json()) as T;
  }

  throw new Error(await response.text());
};

export const fetchApiWithAuth = async <T>(
  url: string,
  options?: RequestInit,
) => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const response = await fetch(url, {
    method: options?.method ?? "GET",
    headers: {
      ...headers,
      ...(options?.headers || {}),
    },
    body: options?.body,
    ...options,
  });

  if (response.ok) {
    return (await response.json()) as T;
  }

  throw new Error(await response.text());
};
