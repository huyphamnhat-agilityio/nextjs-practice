"use client";

import { extendVariants, Button as NextUIButton } from "@nextui-org/react";

export const Button = extendVariants(NextUIButton, {
  variants: {
    size: {
      tiny: "p-0 w-auto h-auto",
      xs: "px-5 py-2.5 w-auto h-auto",
      sm: "px-5.625 py-3.75 w-auto h-auto",
      md: "px-6.25 py-3.75 w-auto h-auto rounded-[5px]",
      lg: "px-10 py-3.75 w-auto h-auto",
    },
    variant: {
      ghost: "hover:!bg-opacity-25",
      light: "hover:!bg-opacity-25",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "xs",
  },
});
