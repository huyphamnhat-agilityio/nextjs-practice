import { z } from "zod";

// Constants
import { EMAIL_REGEX, SUBSCRIBE_MESSAGES } from "@/constants";

export const SubscribeSchema = z.object({
  email: z
    .string()
    .min(1, { message: SUBSCRIBE_MESSAGES.ERROR.REQUIRED })
    .superRefine((data, ctx) => {
      if (!EMAIL_REGEX.test(data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          message: SUBSCRIBE_MESSAGES.ERROR.EMAIL,
          validation: "email",
        });
      }
    }),
});
