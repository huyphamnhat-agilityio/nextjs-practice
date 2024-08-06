"use client";
import {
  extendVariants,
  Pagination as NextUIPagination,
} from "@nextui-org/react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const CustomPagination = extendVariants(NextUIPagination, {
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

export type PaginationProps = {
  total: number;
  initialPage: number;
};
export const Pagination = ({ total, initialPage }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createPageUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <CustomPagination
      total={total}
      initialPage={initialPage}
      onChange={createPageUrl}
      className="flex justify-center m-0"
    />
  );
};
