import { useState, useEffect, useCallback } from "react";
import { Cart, CartItem } from "@/interfaces";

export type UseCartState = {
  cart: Cart | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  success: boolean;
};

export type UseCartActions = {
  fetchCart: () => Promise<void>;
  updateCart: (items: CartItem[]) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
};

export type UseCartReturn = UseCartState & UseCartActions;

export const useCart = (userId: string): UseCartReturn => {
  const [state, setState] = useState<UseCartState>({
    cart: null,
    isLoading: false,
    isUpdating: false,
    error: null,
    success: false,
  });

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const clearSuccess = useCallback(() => {
    setState((prev) => ({ ...prev, success: false }));
  }, []);

  const fetchCart = useCallback(async () => {
    if (!userId) {
      setState((prev) => ({ ...prev, error: "User ID is required" }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      success: false,
    }));

    try {
      const response = await fetch(
        `/api/cart?userId=${encodeURIComponent(userId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch cart");
      }

      const cart: Cart = await response.json();

      setState((prev) => ({
        ...prev,
        cart,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        cart: null,
      }));
    }
  }, [userId]);

  const updateCart = useCallback(
    async (items: CartItem[]) => {
      if (!userId) {
        setState((prev) => ({ ...prev, error: "User ID is required" }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isUpdating: true,
        error: null,
        success: false,
      }));

      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            items,
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Failed to update cart");
        }
        setState((prev) => ({
          ...prev,
          cart: prev.cart ? { ...prev.cart, items } : null,
          isUpdating: false,
          success: true,
          error: null,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isUpdating: false,
          error:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
          success: false,
        }));
      }
    },
    [userId],
  );

  // Auto-fetch cart when userId changes
  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [fetchCart, userId]);

  return {
    // State
    cart: state.cart,
    isLoading: state.isLoading,
    isUpdating: state.isUpdating,
    error: state.error,
    success: state.success,

    // Actions
    fetchCart,
    updateCart,
    clearError,
    clearSuccess,
  };
};
