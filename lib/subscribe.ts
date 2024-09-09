"use server";

// Constants
import { FORM_STATUS, SUBSCRIBE_MESSAGES } from "@/constants";

// Types
import { FormState, Subscription } from "@/types";

// Services
import { fetchApi } from "./fetch";

export const subscribe = async <T extends object>(
  _: FormState<T>,
  formData: FormData,
) => {
  const data: Omit<Subscription, "id"> = {
    email: formData.get("email") as string,
  };

  try {
    await fetchApi<Subscription>(process.env.SUBSCRIBE_API, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return {
      message: SUBSCRIBE_MESSAGES.SUCCESS,
      status: FORM_STATUS.SUCCESS,
    };
  } catch ({ message }) {
    return {
      errors: {
        email: [message],
      },
      status: FORM_STATUS.ERROR,
    };
  }
};
