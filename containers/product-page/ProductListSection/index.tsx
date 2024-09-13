"use client";

import { Suspense, useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Components
import {
  Pagination as CustomPagination,
  ProductList,
  ProductListSkeleton,
  SearchProductForm,
  Spinner,
} from "@/components";

// Sections
import { AddCourseSection } from "@/containers";

// Constants
import { PRODUCT_LIMIT } from "@/constants";

// Types
import { Pagination, Product } from "@/types";

const ProductListSection = ({
  products,
}: {
  products?: Pagination<Product>;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isPaginatingPending, startPaginationTransition] = useTransition();
  const [isSearchPending, startSearchTransition] = useTransition();

  const createPageUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      startPaginationTransition(() =>
        router.push(`${pathname}?${params.toString()}`, { scroll: false }),
      );
    },
    [pathname, router, searchParams],
  );

  return (
    <>
      <div className="flex gap-10 flex-col md:flex-row">
        <SearchProductForm startTransition={startSearchTransition} />
        <AddCourseSection />
      </div>
      <div className="flex flex-col gap-20">
        {isSearchPending ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Spinner />
          </div>
        ) : isPaginatingPending ? (
          <ProductListSkeleton limit={PRODUCT_LIMIT} />
        ) : products && products.data.length ? (
          <ProductList products={products} />
        ) : (
          <h3 className="text-center text-foreground ">
            Oops! No courses have been found.
          </h3>
        )}

        {products && products.totalPages > 0 && (
          <Suspense>
            <CustomPagination
              total={products.totalPages}
              handlePageChange={createPageUrl}
            />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default ProductListSection;
