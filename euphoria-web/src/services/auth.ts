"use server";
import { cookies } from "next/headers";
import { fetchApi } from "./fetch";

// Interfaces
import { AuthResponse, UserPayload } from "@/interfaces";

// Constants
import { RESOURCES } from "@/constants";

const API_URL = process.env.API_URL ?? "";

export const login = async (payload: UserPayload) => {
  const authCredential = await fetchApi<AuthResponse>(
    `${API_URL}/${RESOURCES.LOGIN}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  const expires = new Date(Date.now() + 3600 * 1000);

  (await cookies()).set("accessToken", authCredential.accessToken, {
    httpOnly: true,
    expires,
  });

  return authCredential.user;
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
