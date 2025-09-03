"use client";
import Image from "next/image";
import { useCallback, useState } from "react";

// Types
import { Button } from "@/components/ui/common";
import Link from "next/link";
import CartTable from "./CartTable";
import CartTotal from "./CartTotal";
import { useUserStore } from "@/stores";
import { useCartContext, withCartProvider } from "@/contexts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IMAGES, ROUTES } from "@/constants";
import { Loader2 } from "lucide-react";

const userId = useUserStore.getState().user?.id ?? "";

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
  } = useCartContext();

  const { items = [] } = cart || {};

  const [isConfirmed, setIsConfirmed] = useState(false);

  const { push } = useRouter();

  const handleUpdateQuantity = useCallback(
    async (id: string, quantity: number) => {
      try {
        await updateItemQuantity(id, quantity);
      } catch (error) {
        toast("Update quantity failed", {
          style: { width: "fit-content" },
          dismissible: true,
        });
        console.log(error);
      }
    },
    [updateItemQuantity],
  );

  const handleRemove = useCallback(
    async (id: string) => {
      try {
        await removeItem(id);
      } catch (error) {
        toast("Update quantity failed", {
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
      setIsConfirmed(true);
      await clearCart();
      push(ROUTES.ORDER);
    } catch (error) {
      toast("Checkout failed", {
        style: { width: "fit-content" },
        dismissible: true,
      });
      console.log(error);
      setIsConfirmed(false);
    }
  }, [clearCart, push]);
  if (!cart || isLoading)
    return (
      <div className="container mx-auto flex px-4 pt-10 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );

  if (cart?.items.length === 0 && !isConfirmed) {
    return (
      <div className="container mx-auto flex px-4 pt-10 items-center justify-center">
        <div className="flex flex-col gap-3 md:gap-[50px]">
          <Image
            src={IMAGES.EMPTY_CART}
            alt="Item Cart Image"
            width={448}
            height={328}
            className="object-cover"
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
        data={items}
        removeItem={handleRemove}
        updateQuantity={handleUpdateQuantity}
        disabled={isUpdating}
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

export default withCartProvider(CartContent, userId);
