"use client";

import { Suspense, useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Components
import {
  Pagination as CustomPagination,
  ProductList,
  ProductListSkeleton,
} from "@/components";

// Constants
import { PRODUCT_LIMIT } from "@/constants";

// Types
import { Pagination, Product } from "@/types";

const ProductListSection = ({
  products,
}: {
  products: Pagination<Product>;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const createPageUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      startTransition(() =>
        router.push(`${pathname}?${params.toString()}`, { scroll: false }),
      );
    },
    [pathname, router, searchParams],
  );

  return (
    <div className="flex flex-col gap-20">
      {isPending ? (
        <ProductListSkeleton limit={PRODUCT_LIMIT} />
      ) : (
        <Suspense fallback={<ProductListSkeleton limit={PRODUCT_LIMIT} />}>
          <ProductList products={products} />
        </Suspense>
      )}

      <Suspense>
        <CustomPagination
          total={products.totalPages}
          handlePageChange={createPageUrl}
        />
      </Suspense>
    </div>
  );
};

export default ProductListSection;
