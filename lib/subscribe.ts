"use server";
import { z } from "zod";

// Constants
import { SUBSCRIBE_MESSAGES } from "@/constants";

// Types
import { FormState, Subscription } from "@/types";

// Services
import { fetchApi } from "./fetch";

const SubscribeSchema = z.object({
  email: z
    .string()
    .min(1, { message: SUBSCRIBE_MESSAGES.ERROR.REQUIRED })
    .refine(
      (value) => value === "" || z.string().email().safeParse(value).success,
      {
        message: SUBSCRIBE_MESSAGES.ERROR.EMAIL,
      },
    ),
});

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
