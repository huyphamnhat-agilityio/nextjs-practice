"use client";
import Image from "next/image";
import { useState } from "react";

// Types
import { CartItem } from "@/interfaces";
import { Button } from "@/components/ui/common";
import Link from "next/link";
import CartTable from "./CartTable";
import CartTotal from "./CartTotal";

const cart: CartItem[] = [
  {
    id: "1",
    name: "Blue Flower Print Crop Top",
    color: "Yellow",
    size: "M",
    price: 29.0,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop&crop=center",
    shipping: 0,
  },
  {
    id: "2",
    name: "Lavender Hoodie Super Super Long Product Name To Test Truncation",
    color: "Lavender",
    size: "XXL",
    price: 119.0,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&h=150&fit=crop&crop=center",
    shipping: 0,
  },
  {
    id: "3",
    name: "Black Sweatshirt",
    color: "Black",
    size: "XXL",
    price: 123.0,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center",
    shipping: 5.0,
  },
];

const CartContent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(cart);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalShipping = cartItems.reduce((sum, item) => sum + item.shipping, 0);
  const grandTotal = subtotal + totalShipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto flex px-4 pt-10 items-center justify-center">
        <div className="flex flex-col gap-3 md:gap-[50px]">
          <Image
            src="/images/empty-cart.jpg"
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
              Add something to make it happy!
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
        data={cartItems}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
      />

      {/* Cart Summary */}
      <CartTotal
        subtotal={subtotal}
        totalShipping={totalShipping}
        grandTotal={grandTotal}
        handleCheckout={() => {}}
      />
    </>
  );
};

export default CartContent;
