import { z } from "zod";

// Constants
import { SUBSCRIBE_MESSAGES } from "@/constants";

export const SubscribeSchema = z.object({
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
