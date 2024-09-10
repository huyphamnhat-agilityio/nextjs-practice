"use server";

// Constants
import { FORM_STATUS, SUBSCRIBE_MESSAGES } from "@/constants";

// Types
import { FormState, Subscription } from "@/types";

// Services
import { fetchApi } from "./fetch";

// Schemas
import { SubscribeSchema } from "@/schemas";

export const validateSubscribeSchema = async (formData: object) => {
  const validateFormData = SubscribeSchema.safeParse(formData);

  return validateFormData;
};

export const subscribe = async <T extends object>(
  _: FormState<T>,
  formData: FormData,
) => {
  const subscribeData = {
    email: formData.get("email") as string,
  };

  const validateSubscribeData = await validateSubscribeSchema(subscribeData);

  if (!validateSubscribeData.success)
    return {
      errors: validateSubscribeData.error.flatten().fieldErrors,
    };

  const data: Omit<Subscription, "id"> = {
    email: subscribeData.email,
  };

  try {
    await fetchApi<Subscription>(process.env.SUBSCRIBE_API, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return {
      message: SUBSCRIBE_MESSAGES.SUCCESS,
      status: FORM_STATUS.SUCCESS,
      // reference: https://github.com/facebook/react/issues/27876#issuecomment-1958913875
      resetKey: Date.now().toString(), // Generate a new resetKey to trigger form reset
    };
  } catch ({ message }) {
    return {
      message,
      status: FORM_STATUS.ERROR,
    };
  }
};
