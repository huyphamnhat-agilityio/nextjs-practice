"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Types
import { ToastType } from "@/types";
import { PRODUCT_MESSAGES } from "@/constants";

export default function Template({ children }: { children: React.ReactNode }) {
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
  }, [message, pathname, router, searchParams, toastType]);

  return <div>{children}</div>;
}
