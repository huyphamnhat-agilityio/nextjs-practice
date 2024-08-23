import { FETCH_ERROR_MESSAGES } from "@/constants";

export const fetchApi = async <T>(url: string, options?: RequestInit) => {
  let headerOption: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (options)
    if (options.hasOwnProperty("headers")) headerOption = options.headers;

  const response = await fetch(url, {
    method: options?.method || "GET",
    headers: headerOption,
    body: options?.body,
    ...options,
  });
  if (response.ok) return response.json() as T;

  const errorMessage = `${response.status}: ${FETCH_ERROR_MESSAGES[`${response.status}`]}`;

  throw {
    status: response.status,
    message: errorMessage,
  };
};
