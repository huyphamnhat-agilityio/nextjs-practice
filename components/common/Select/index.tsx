"use client";

import { extendVariants, Select as NextUISelect } from "@nextui-org/react";

export const Select = extendVariants(NextUISelect, {
  variants: {
    color: {
      default: {
        mainWrapper: "bg-foreground-200 border-foreground-300",
        input: "text-foreground-100 hover:bg-foreground",
      },
    },
    size: {
      md: {
        mainWrapper: "h-auto border",
        input: "h-auto text-sm/7",
      },
    },
    radius: {
      sm: {
        mainWrapper: "rounded-1.25",
      },
    },
    border: {
      default: {
        mainWrapper: "border",
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
