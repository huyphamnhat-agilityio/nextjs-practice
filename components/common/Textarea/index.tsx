"use client";

import { extendVariants, Textarea as NextUITextarea } from "@nextui-org/react";

export const Textarea = extendVariants(NextUITextarea, {
  variants: {
    color: {
      default: {
        inputWrapper: "bg-foreground-200 border-foreground-300",
        input: "text-foreground-100",
      },
    },
    size: {
      md: {
        inputWrapper: "h-auto py-2 border",
        input: "h-auto text-sm/7",
      },
    },
    radius: {
      sm: {
        inputWrapper: "rounded-1.25",
      },
    },
    border: {
      default: {
        inputWrapper: "border",
      },
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
    radius: "sm",
    border: "default",
  },
});
