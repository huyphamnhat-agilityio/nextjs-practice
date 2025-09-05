"use client";

import { CartIcon } from "@/components/icons";
import { Badge, Button } from "../common";

export type CartButtonProps = {
  onClick?: () => void;
};
const CartButton = ({ onClick }: CartButtonProps) => {
  return (
    <Button variant="icon" onClick={onClick} data-testid="cart-button">
      <Badge></Badge>
      <CartIcon />
    </Button>
  );
};

export default CartButton;
