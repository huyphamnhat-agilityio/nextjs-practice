import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { CartItem } from "@/interfaces";
import { useCartStore } from "@/stores/cart";

export const useCart = () => {
  // ✅ Combined selector with useShallow for optimal re-renders
  const { cart, isLoading, isMutating, fetchCart, mutateCart } = useCartStore(
    useShallow((s) => ({
      cart: s.cart,
      isLoading: s.isLoading,
      isMutating: s.isMutating,
      fetchCart: s.fetchCart,
      mutateCart: s.mutateCart,
    })),
  );

  // ✅ Memoized computed values to prevent unnecessary recalculations
  const { totalItems, totalPrice, totalShipping } = useMemo(() => {
    if (!cart) {
      return { totalItems: 0, totalPrice: 0, totalShipping: 0 };
    }

    return {
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      totalShipping: cart.reduce((sum, item) => sum + item.shipping, 0),
    };
  }, [cart]);

  const updateCart = useCallback(
    async (items: CartItem[]) => {
      return await mutateCart(items);
    },
    [mutateCart],
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      if (!cart) return;

      const updatedItems = cart.filter((item) => item.id !== itemId);
      await updateCart(updatedItems);
    },
    [updateCart, cart],
  );

  const updateItemQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (!cart) return;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        await removeItem(itemId);
        return;
      }

      const updatedItems = cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      );

      await updateCart(updatedItems);
    },
    [updateCart, cart, removeItem],
  );

  const clearCart = useCallback(async () => {
    await updateCart([]);
  }, [updateCart]);

  return useMemo(
    () => ({
      cart,
      isLoading,
      isUpdating: isMutating,
      totalItems,
      totalPrice,
      totalShipping,

      fetchCart,
      updateCart,
      updateItemQuantity,
      removeItem,
      clearCart,
    }),
    [
      cart,
      isLoading,
      isMutating,
      totalItems,
      totalPrice,
      totalShipping,
      fetchCart,
      updateCart,
      updateItemQuantity,
      removeItem,
      clearCart,
    ],
  );
};
