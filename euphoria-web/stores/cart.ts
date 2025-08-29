"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Cart, CartItem, Product } from "@/interfaces";
import { API_ROUTES } from "@/constants";
import { useUserStore } from "./user";

export interface MutationResult {
  success: boolean;
  data?: Cart;
  error?: string;
}

export type CartStore = {
  // State
  cart: CartItem[];
  isLoading: boolean;
  isInitialized: boolean;
  isMutating: boolean;
  error: string | null;

  // Actions
  setCart: (cart: CartItem[]) => void;
  setLoading: (isLoading: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
  setMutating: (isMutating: boolean) => void;
  setError: (error: string | null) => void;

  // Computed values
  getSubtotal: () => number;
  getShippingTotal: () => number;
  getItemsCount: () => number;

  // API operations
  fetchCart: (userId: string) => Promise<void>;
  mutateCart: (
    newCart: CartItem[],
    optimistic?: boolean,
  ) => Promise<MutationResult>;
  addToCart: (product: Product) => Promise<MutationResult>;

  // Cart page operations (optimistic)
  updateQuantityOptimistic: (productId: string, quantity: number) => CartItem[];
  removeFromCartOptimistic: (productId: string) => CartItem[];
  clearCartOptimistic: () => CartItem[];
};

export const useCartStore = create<CartStore>()(
  immer((set, get) => ({
    // State
    cart: [],
    isLoading: false,
    isInitialized: false,
    isMutating: false,
    error: null,

    // Actions
    setCart: (cart) =>
      set((state) => {
        state.cart = cart;
      }),
    setLoading: (isLoading) =>
      set((state) => {
        state.isLoading = isLoading;
      }),
    setInitialized: (isInitialized) =>
      set((state) => {
        state.isInitialized = isInitialized;
      }),
    setMutating: (isMutating) =>
      set((state) => {
        state.isMutating = isMutating;
      }),
    setError: (error) =>
      set((state) => {
        state.error = error;
      }),

    // Computed values
    getSubtotal: () => {
      const { cart } = get();
      return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    getShippingTotal: () => {
      const { cart } = get();
      return cart.reduce((sum, item) => sum + item.shipping, 0);
    },

    getItemsCount: () => {
      const { cart } = get();
      return cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    // API operations
    fetchCart: async (userId: string) => {
      const { isInitialized } = get();
      if (isInitialized) return;

      try {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        const response = await fetch(`${API_ROUTES.CART}?userId=${userId}`);

        const data: Cart | null = await response.json();

        if (data)
          set((state) => {
            state.cart = data.items || [];
            state.isInitialized = true;
            state.isLoading = false;
          });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Failed to fetch cart:", error);

        set((state) => {
          state.error = errorMessage;
          state.isLoading = false;
          state.isInitialized = true;
        });
      }
    },

    mutateCart: async (newCart, optimistic = true) => {
      const previousCart = get().cart;

      const userId = useUserStore.getState().user?.id ?? "";
      try {
        set((state) => {
          state.isMutating = true;
          state.error = null;
          if (optimistic) state.cart = newCart;
        });

        const response = await fetch(`${API_ROUTES.CART}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: newCart, userId }),
        });

        const result: Cart = await response.json();

        set((state) => {
          state.cart = result.items || newCart;
          state.isMutating = false;
        });

        return { success: true, data: result };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Failed to mutate cart:", error);

        set((state) => {
          if (optimistic) state.cart = previousCart;
          state.error = errorMessage;
          state.isMutating = false;
        });

        return { success: false, error: errorMessage };
      }
    },

    addToCart: async (product) => {
      const { cart } = get();

      const existing = cart.find((item) => item.id === product.id);
      const newCart: CartItem[] = existing
        ? cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [
            ...cart,
            {
              id: product.id,
              quantity: 1,
              name: product.name,
              price: product.price,
              image: product.image,
              shipping: product.shipping,
              color: product.colors[0].value,
              size: product.sizes[0],
            },
          ];

      const result = await get().mutateCart(newCart, false);

      if (result.success && result.data) {
        set((state) => {
          state.cart = result.data?.items || newCart;
        });
      }

      return result;
    },

    // Cart page optimistic operations
    updateQuantityOptimistic: (productId, quantity) => {
      const { cart } = get();
      if (quantity <= 0) {
        return get().removeFromCartOptimistic(productId);
      }
      return cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
    },

    removeFromCartOptimistic: (productId) => {
      const { cart } = get();
      return cart.filter((item) => item.id !== productId);
    },

    clearCartOptimistic: () => {
      return [];
    },
  })),
);
