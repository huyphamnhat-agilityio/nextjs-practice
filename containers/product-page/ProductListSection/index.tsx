"use client";

import { Suspense, useCallback, useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Components
import {
  Pagination as CustomPagination,
  ProductList,
  ProductListSkeleton,
} from "@/components";

// Constants
import {
  PRODUCT_LIMIT,
  TOAST_ACTION,
  TOAST_QUERY_PARAMS,
  TOAST_SECTION,
  TOAST_TYPE,
} from "@/constants";

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

  const toastType = searchParams.get(TOAST_QUERY_PARAMS.TOAST_TYPE);
  const toastSection = searchParams.get(TOAST_QUERY_PARAMS.TOAST_SECTION);
  const toastAction = searchParams.get(TOAST_QUERY_PARAMS.TOAST_ACTION);
  const message = searchParams.get(TOAST_QUERY_PARAMS.MESSAGE);

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

  useEffect(() => {
    if (
      toastSection === TOAST_SECTION.PRODUCT_LIST_SECTION &&
      toastAction === TOAST_ACTION.CONFIRM
    ) {
      toastType === TOAST_TYPE.SUCCESS
        ? toast.success(message)
        : toast.error(message);

      const params = new URLSearchParams(searchParams.toString());

      params.delete(TOAST_QUERY_PARAMS.TOAST_TYPE);
      params.delete(TOAST_QUERY_PARAMS.TOAST_SECTION);
      params.delete(TOAST_QUERY_PARAMS.TOAST_ACTION);
      params.delete(TOAST_QUERY_PARAMS.MESSAGE);

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [
    toastAction,
    message,
    pathname,
    router,
    searchParams,
    toastSection,
    toastType,
  ]);

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
