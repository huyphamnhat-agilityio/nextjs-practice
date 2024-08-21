"use client";

import { extendVariants, Button as NextUIButton } from "@nextui-org/react";

export const Button = extendVariants(NextUIButton, {
  variants: {
    size: {
      tiny: "p-2.5 min-w-0 w-auto h-auto rounded-full",
      xs: "px-5 py-2.5 min-w-0 w-auto h-auto rounded-[37px]",
      sm: "px-5.625 py-3.75 w-auto h-auto",
      md: "px-6.25 py-3.75 w-auto h-auto rounded-1.25",
      lg: "px-10 py-3.75 w-auto h-auto rounded-1.25",
      icon: "px-4.75 py-5.5 w-auto h-auto rounded-2.5",
    },
    variant: {
      ghost: "hover:bg-opacity-25",
      light: "hover:bg-opacity-25",
      bordered: "hover:bg-primary hover:bg-opacity-25",
      action: "hover:opacity-60",
      flat: "bg-danger/30",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "xs",
  },
});
