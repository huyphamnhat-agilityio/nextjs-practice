import { API_ROUTES } from "@/constants";
import { User, UserPayload } from "@/interfaces";

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

    if (!response.ok)
      throw new Error(JSON.parse(await response.text()) as string);

    const userInfo: Omit<User, "password"> = await response.json();

    return userInfo;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const logout = async () => {
  let response: Response;

  try {
    response = await fetch(API_ROUTES.LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(JSON.parse(await response.text()) as string);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
