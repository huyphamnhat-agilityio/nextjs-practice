// MyButton.tsx
import { extendVariants } from "@nextui-org/react";
import { Button as NextUIButton } from "@nextui-org/button";
export const Button = extendVariants(NextUIButton, {
  variants: {
    // <- modify/add variants
    color: {
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]",
    },
  },
});
