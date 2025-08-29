"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores";

export default function CartInitializer(): null {
  const pathname = usePathname();
  const { fetchCart } = useCartStore();

  useEffect(() => {
    // Only fetch cart if we're on the cart page for the first time
    if (pathname === "/cart") {
      fetchCart("1");
    }
  }, [pathname, fetchCart]);

  return null;
}
