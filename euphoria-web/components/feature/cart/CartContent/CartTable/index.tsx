// Components
import CartItem from "../CartItem";

// Types
import { CartItem as CartItemType } from "@/interfaces";

export type CartTableProps = {
  data: CartItemType[];
  updateQuantity: (id: string, newQuantity: number) => Promise<void>;
  removeItem: (id: string) => void;
};
const CartTable = ({ data, updateQuantity, removeItem }: CartTableProps) => {
  return (
    <div className="bg-card overflow-hidden shadow-sm">
      {/* Table Header - Hidden on mobile */}
      <div className="hidden lg:block bg-muted-foreground text-white px-24 py-7">
        <div className="grid grid-cols-12 gap-4 text-base font-causten font-medium">
          <div className="col-span-4">PRODUCT DETAILS</div>
          <div className="col-span-1 text-center">PRICE</div>
          <div className="col-span-2 text-center">QUANTITY</div>
          <div className="col-span-2 text-center">SHIPPING</div>
          <div className="col-span-2 text-center">SUBTOTAL</div>
          <div className="col-span-1 text-center">ACTION</div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-border">
        {data.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onRemove={removeItem}
            onUpdate={updateQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default CartTable;
