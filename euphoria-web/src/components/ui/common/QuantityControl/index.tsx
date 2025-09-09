import React, { useCallback } from "react";
import { Button } from "../Button";
import { Minus, Plus } from "lucide-react";

export type QuantityControlProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  isDisabled?: boolean;
};
const QuantityControl = ({
  quantity,
  setQuantity,
  isDisabled,
}: QuantityControlProps) => {
  const handleChangeQuantity = useCallback(
    (amount: number) => () => {
      if (quantity === 0) return;
      setQuantity(quantity + amount);
    },
    [quantity, setQuantity],
  );
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="w-8 h-8 p-0"
        onClick={handleChangeQuantity(-1)}
        disabled={isDisabled}
        data-testid="decrement-button"
      >
        <Minus className="w-3 h-3" />
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="sm"
        className="w-8 h-8 p-0"
        onClick={handleChangeQuantity(1)}
        disabled={isDisabled}
        data-testid="increment-button"
      >
        <Plus className="w-3 h-3" />
      </Button>
    </>
  );
};

export default QuantityControl;
