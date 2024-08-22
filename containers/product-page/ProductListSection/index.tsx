"use client";
import { PRODUCT_MESSAGES, TOAST_SECTION, TOAST_TYPE } from "@/constants";
import { ToastType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

const ProductListSection = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const toastType = searchParams.get("toastType");
  const toastSection = searchParams.get("toastSection");
  const message = searchParams.get("message");

  useEffect(() => {
    if (toastSection === TOAST_SECTION.PRODUCT_LIST_SECTION) {
      toastType === TOAST_TYPE.SUCCESS
        ? toast.success(message)
        : toast.error(message);

      const params = new URLSearchParams(searchParams.toString());

      params.delete("toastType");
      params.delete("message");
      params.delete("toastSection");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [message, pathname, router, searchParams, toastSection, toastType]);

  return <div>{children}</div>;
};

export default ProductListSection;
