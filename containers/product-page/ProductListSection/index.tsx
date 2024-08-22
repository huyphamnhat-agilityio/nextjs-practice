"use client";
import { PRODUCT_MESSAGES } from "@/constants";
import { ToastType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

const ProductListSection = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const toastType = searchParams.get("toastType");
  const message = searchParams.get("message");

  useEffect(() => {
    if (
      toastType === ToastType.SUCCESS &&
      message === PRODUCT_MESSAGES.SUCCESS.DELETE
    ) {
      toast.success(message);

      const params = new URLSearchParams(searchParams.toString());

      params.delete("toastType");
      params.delete("message");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    if (
      toastType === ToastType.ERROR &&
      message === PRODUCT_MESSAGES.ERROR.DELETE
    ) {
      toast.error(message);

      const params = new URLSearchParams(searchParams.toString());

      params.delete("toastType");
      params.delete("message");
      params.delete("id");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [message, pathname, router, searchParams, toastType]);
  return <div>{children}</div>;
};

export default ProductListSection;
