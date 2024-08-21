"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Types
import { ToastType } from "@/types";

export default function Template({ children }: { children: React.ReactNode }) {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();

  // const toastType = searchParams.get("toastType");
  // const message = searchParams.get("message");

  // useEffect(() => {
  //   if (toastType === ToastType.SUCCESS && message) {
  //     toast.success(message);
  //     const params = new URLSearchParams(searchParams);

  //     params.delete("toastType");
  //     params.delete("message");

  //     router.push(`${pathname}?${params.toString()}`);
  //   }
  // }, [message, pathname, router, searchParams, toastType]);

  return <div>{children}</div>;
}
