import { API_ROUTES } from "@/constants";
import { UserPayload } from "@/interfaces";
import { redirect } from "next/navigation";

export const login = async (data: UserPayload) => {
  let response: Response;
  try {
    response = await fetch(API_ROUTES.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) return JSON.parse(await response.text()) as string;
  } catch (error) {
    return (error as Error).message;
  }

  redirect("/");
};
