import { useCallback } from "react";
import { CartItem } from "@/interfaces";
import { useCartStore } from "@/stores/cart";

export const useCart = () => {
  // ✅ Selectors from store
  const cart = useCartStore((s) => s.cart);
  const isLoading = useCartStore((s) => s.isLoading);
  const isMutating = useCartStore((s) => s.isMutating);
  const error = useCartStore((s) => s.error);

  const fetchCart = useCartStore((s) => s.fetchCart);
  const mutateCart = useCartStore((s) => s.mutateCart);
  const setError = useCartStore((s) => s.setError);

  // ✅ Expose helpers with same signature as old hook
  const updateCart = useCallback(
    async (items: CartItem[]) => {
      return await mutateCart(items, true); // optimistic by default
    },
    [mutateCart],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

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

  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const totalPrice =
    cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const totalShipping =
    cart?.reduce((sum, item) => sum + item.shipping, 0) || 0;

  return {
    // State
    cart,
    isLoading,
    isUpdating: isMutating,
    error,
    success: !error && !isMutating,
    totalItems,
    totalPrice,
    totalShipping,

    // Actions
    fetchCart,
    updateCart,
    clearError,
    clearSuccess: () => {},
    updateItemQuantity,
    removeItem,
    clearCart,
  };
};
