// Components
import { Button } from "@/components/ui/common";

export type CartTotalTypes = {
  subtotal: number;
  totalShipping: number;
  grandTotal: number;
  handleCheckout?: () => void;
  disabled?: boolean;
};

const CartTotal = ({
  subtotal,
  totalShipping,
  grandTotal,
  handleCheckout,
  disabled = false,
}: CartTotalTypes) => {
  return (
    <div className="flex flex-col w-full mt-8 space-y-4">
      <div className="flex justify-between items-center font-causten font-medium text-accent text-base md:text-[22px]">
        <span>Sub Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center font-causten font-medium text-accent text-base md:text-[22px]">
        <span>Shipping</span>
        <span>${totalShipping.toFixed(2)}</span>
      </div>
      <hr className="border-border" />
      <div className="flex justify-between items-center font-bold font-causten text-accent text-base md:text-[22px]">
        <span>Grand Total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>
      <Button
        font="causten"
        fontWeight="semibold"
        fontSize="lg"
        className="max-w-[232px] ml-auto h-12 mt-6"
        onClick={handleCheckout}
        disabled={disabled}
      >
        Proceed To Checkout
      </Button>
    </div>
  );
};

export default CartTotal;
