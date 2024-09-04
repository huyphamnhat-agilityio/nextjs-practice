"use client";
import {
  extendVariants,
  Pagination as NextUIPagination,
} from "@nextui-org/react";

import { useSearchParams } from "next/navigation";

export const CustomPagination = extendVariants(NextUIPagination, {
  variants: {
    color: {
      primary: {
        item: "text-foreground hover:bg-primary hover:bg-opacity-25",
        wrapper: "text-white",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export type PaginationProps = {
  total: number;
  handlePageChange: (page: number) => void;
};

export const Pagination = ({ total, handlePageChange }: PaginationProps) => {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  return (
    <CustomPagination
      total={total}
      page={currentPage}
      onChange={handlePageChange}
      className="flex justify-center m-0"
    />
  );
};
