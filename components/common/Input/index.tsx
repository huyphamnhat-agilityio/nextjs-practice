"use client";

import { extendVariants, Input as NextUIInput } from "@nextui-org/react";

export const Input = extendVariants(NextUIInput, {
  variants: {
    color: {
      default: {
        inputWrapper: "bg-foreground-200 border-foreground-300",
        input: "text-foreground-100",
      },
    },
    size: {
      md: {
        inputWrapper: "h-auto py-2",
        input: "h-auto text-sm/7",
        errorMessage: "text-md",
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
    isClearable: "true",
  },
});
