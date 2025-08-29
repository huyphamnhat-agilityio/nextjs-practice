"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { Cart, CartItem } from "@/interfaces";
import { useCart } from "@/hooks/cart";

// Types for the context
interface CartContextType {
  // State
  cart: Cart | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  success: boolean;

  // Actions
  fetchCart: () => Promise<void>;
  updateCart: (items: CartItem[]) => Promise<void>;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;

  // Computed values
  totalItems: number;
  totalPrice: number;
  totalShipping: number;
  isEmpty: boolean;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider props
interface CartProviderProps {
  children: ReactNode;
  userId: string;
}

// Provider component
export const CartProvider: React.FC<CartProviderProps> = ({
  children,
  userId,
}) => {
  const {
    cart,
    isLoading,
    isUpdating,
    error,
    success,
    fetchCart,
    updateCart,
    clearError,
    clearSuccess,
  } = useCart(userId);

  // Helper function to add an item to cart
  const addItem = useCallback(
    async (newItem: CartItem) => {
      const currentItems = cart?.items || [];

      // Check if item already exists (same id, color, size)
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.color === newItem.color &&
          item.size === newItem.size,
      );

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        updatedItems = currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        // Add new item
        updatedItems = [...currentItems, newItem];
      }

      await updateCart(updatedItems);
    },
    [updateCart, cart],
  );

  // Helper function to remove an item from cart
  const removeItem = useCallback(
    async (itemId: string) => {
      if (!cart) return;

      const updatedItems = cart.items.filter((item) => item.id !== itemId);
      await updateCart(updatedItems);
    },
    [updateCart, cart],
  );

  // Helper function to update item quantity
  const updateItemQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (!cart) return;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        await removeItem(itemId);
        return;
      }

      const updatedItems = cart.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      );

      await updateCart(updatedItems);
    },
    [updateCart, cart, removeItem],
  );

  // Helper function to clear cart
  const clearCart = useCallback(async () => {
    await updateCart([]);
  }, [updateCart]);

  // Computed values
  const totalItems =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const totalPrice =
    cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const totalShipping =
    cart?.items.reduce((sum, item) => sum + item.shipping, 0) || 0;

  const isEmpty = !cart || cart.items.length === 0;

  const contextValue: CartContextType = useMemo(
    () => ({
      // State
      cart,
      isLoading,
      isUpdating,
      error,
      success,

      // Actions
      fetchCart,
      updateCart,
      addItem,
      removeItem,
      updateItemQuantity,
      clearCart,
      clearError,
      clearSuccess,

      // Computed values
      totalItems,
      totalPrice,
      totalShipping,
      isEmpty,
    }),
    [
      cart,
      isLoading,
      isUpdating,
      error,
      success,
      fetchCart,
      updateCart,
      addItem,
      removeItem,
      updateItemQuantity,
      clearCart,
      clearError,
      clearSuccess,
      totalItems,
      totalPrice,
      totalShipping,
      isEmpty,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};

// HOC for components that need cart context
export const withCartProvider = <P extends object>(
  Component: React.ComponentType<P>,
  userId: string,
) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <CartProvider userId={userId}>
      <Component {...props} />
    </CartProvider>
  );

  WrappedComponent.displayName = `withCartProvider(${Component.displayName || Component.name})`;

  return WrappedComponent;
};
