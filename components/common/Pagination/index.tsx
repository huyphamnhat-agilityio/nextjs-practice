"use client";
import {
  extendVariants,
  Pagination as NextUIPagination,
} from "@nextui-org/react";

export const Pagination = extendVariants(NextUIPagination, {
  variants: {
    color: {
      primary: {
        item: "text-white hover:bg-primary hover:bg-opacity-25",
        wrapper: "text-white",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
