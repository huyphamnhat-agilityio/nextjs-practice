"use client";

// Constants
import {
  TOAST_ACTION,
  TOAST_QUERY_PARAMS,
  TOAST_SECTION,
  TOAST_TYPE,
} from "@/constants";
import { ToastType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

const ProductListSection = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const toastType = searchParams.get(TOAST_QUERY_PARAMS.TOAST_TYPE);
  const toastSection = searchParams.get(TOAST_QUERY_PARAMS.TOAST_SECTION);
  const toastAction = searchParams.get(TOAST_QUERY_PARAMS.TOAST_ACTION);
  const message = searchParams.get(TOAST_QUERY_PARAMS.MESSAGE);

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

  return <div>{children}</div>;
};

export default ProductListSection;
