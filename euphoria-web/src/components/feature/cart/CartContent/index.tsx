"use client";
import Image from "next/image";
import { useCallback, useState, useTransition } from "react";

// Types
import { Button } from "@/components/ui/common";
import Link from "next/link";
import CartTable from "./CartTable";
import CartTotal from "./CartTotal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { Loader2 } from "lucide-react";
import { useCart } from "@/hooks/cart";

const CartContent = () => {
  const {
    cart,
    updateItemQuantity,
    removeItem,
    isLoading,
    isUpdating,
    totalPrice,
    totalShipping,
    clearCart,
  } = useCart(true);

  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { push } = useRouter();

  const handleUpdateQuantity = useCallback(
    async (id: string, quantity: number) => {
      await updateItemQuantity(id, quantity);
    },
    [updateItemQuantity],
  );

  const handleRemove = useCallback(
    async (id: string) => {
      try {
        await removeItem(id);
      } catch (error) {
        toast("Remove item failed", {
          style: { width: "fit-content" },
          dismissible: true,
        });
        console.log(error);
      }
    },
    [removeItem],
  );

  const handleCheckout = useCallback(async () => {
    try {
      setIsPurchasing(true);
      await clearCart();
      startTransition(() => push(ROUTES.ORDER));
    } catch (error) {
      toast("Checkout failed", {
        style: { width: "fit-content" },
        dismissible: true,
      });
      console.log(error);
    } finally {
      setIsPurchasing(false);
    }
  }, [clearCart, push]);
  if (!cart || isLoading || isPurchasing || isPending)
    return (
      <div className="container mx-auto flex px-4 pt-10 items-center justify-center">
        <Loader2
          data-testid="loading-spinner"
          className="h-6 w-6 animate-spin"
        />
      </div>
    );

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex px-4 pt-10 items-center justify-center">
        <div className="flex flex-col gap-3 md:gap-[50px]">
          <Image
            src="/images/empty-cart.jpg"
            alt="Item Cart Image"
            width={448}
            height={328}
            className="object-cover"
            fetchPriority="high"
            priority
            loading="eager"
          />
          <div className="flex flex-col items-center justify-center gap-3">
            <h3 className="font-core-sans-c font-bold text-black text-4xl text-center">
              Your cart is empty and sad :<span className="font-sans">(</span>
            </h3>
            <p className="font-core-sans-c font-normal text-alternative text-center text-base">
              Add something to make it happy<span className="font-sans">!</span>
            </p>
          </div>

          <Button font="causten" fontSize="lg" fontWeight="semibold" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CartTable
        data={cart}
        removeItem={handleRemove}
        updateQuantity={handleUpdateQuantity}
      />

      {/* Cart Summary */}
      <CartTotal
        subtotal={totalPrice}
        totalShipping={totalShipping}
        grandTotal={totalPrice + totalShipping}
        handleCheckout={handleCheckout}
        disabled={isUpdating}
      />
    </>
  );
};

export default CartContent;
