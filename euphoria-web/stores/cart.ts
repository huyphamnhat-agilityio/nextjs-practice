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
  setMutating: (isMutating: boolean) => void;

  // API operations
  fetchCart: (userId: string) => Promise<void>;
  mutateCart: (newCart: CartItem[]) => Promise<void>;
  addToCart: (product: Product) => Promise<void>;
};

export const useCartStore = create<CartStore>()(
  immer((set, get) => ({
    // State
    cart: [],
    isLoading: false,
    isMutating: false,
    isInitialized: false,
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
    setMutating: (isMutating) =>
      set((state) => {
        state.isMutating = isMutating;
      }),

    // API operations
    fetchCart: async (userId: string) => {
      try {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        const response = await fetch(`${API_ROUTES.CART}?userId=${userId}`);
        const data = await response.json();

        if (typeof data === "object") {
          set((state) => {
            state.cart = data.items ?? [];
            state.isInitialized = true;
            state.isLoading = false;
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Failed to fetch cart:", error);

        set((state) => {
          state.error = errorMessage;
          state.isLoading = false;
        });

        throw error;
      }
    },

    mutateCart: async (newCart) => {
      const userId = useUserStore.getState().user?.id ?? "";

      try {
        set((state) => {
          state.isMutating = true;
          state.error = null;
        });

        await fetch(`${API_ROUTES.CART}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: newCart, userId }),
        });

        set((state) => {
          state.isMutating = false;
          state.cart = newCart;
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Failed to mutate cart:", error);

        set((state) => {
          state.error = errorMessage;
          state.isMutating = false;
        });

        throw error;
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

      await get().mutateCart(newCart);
    },
  })),
);
