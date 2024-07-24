// MyButton.tsx
import { extendVariants, Button as NextUIButton } from "@nextui-org/react";

export const Button = extendVariants(NextUIButton, {
  variants: {
    // <- modify/add variants
    color: {
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]",
    },
    size: {
      xs: "px-5 py-2.5 w-auto h-auto",
      sm: "px-5.625 py-3.75 w-auto h-auto",
      md: "px-6.25 py-3.75 w-auto h-auto",
      lg: "px-10 py-3.75 w-auto h-auto",
    },
    variant: {
      ghost: "hover:!bg-opacity-25",
    },
  },
  defaultVariants: {
    // <- modify/add default variants
    color: "primary",
    size: "xs",
  },
});
