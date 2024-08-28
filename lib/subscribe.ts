"use server";

// Constants
import { SUBSCRIBE_MESSAGES } from "@/constants";

// Types
import { FormState, Subscription } from "@/types";

// Services
import { fetchApi } from "./fetch";

// Schemas
import { SubscribeSchema } from "@/schemas";

export const subscribe = async <T extends object>(
  _: FormState<T>,
  formData: FormData,
) => {
  const validateFormData = SubscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validateFormData.success) {
    return {
      errors: validateFormData.error.flatten().fieldErrors,
    };
  }

  const data: Omit<Subscription, "id"> = {
    email: validateFormData.data.email,
  };

  try {
    await fetchApi<Subscription>(process.env.SUBSCRIBE_API, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return {
      message: SUBSCRIBE_MESSAGES.SUCCESS,
      // reference: https://github.com/facebook/react/issues/27876#issuecomment-1958913875
      resetKey: Date.now().toString(), // Generate a new resetKey to trigger form reset
    };
  } catch ({ message }) {
    return {
      message,
    };
  }
};
