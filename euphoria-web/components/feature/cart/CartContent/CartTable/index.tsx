import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

// Components
import { Button } from "@/components/ui/common";

// Types
import { CartItem } from "@/interfaces";

export type CartTableProps = {
  data: CartItem[];
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  disabled?: boolean;
};
const CartTable = ({
  data,
  updateQuantity,
  removeItem,
  disabled = false,
}: CartTableProps) => {
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
          <div key={item.id} className="p-4 lg:px-24">
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
              {/* Product Details */}
              <div className="col-span-4 flex items-center space-x-4">
                <div className="w-30 h-30 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="object-cover"
                    unoptimized
                    loading="eager"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-causten font-bold text-accent text-lg truncate">
                    {item.name}
                  </h3>
                  <p className="font-causten font-bold text-sm text-alternative">
                    Color: {item.color}
                  </p>
                  <p className="font-causten font-bold text-sm text-alternative">
                    Size: {item.size}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-1 text-center">
                <span className="font-causten font-bold text-accent text-lg">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex items-center justify-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={disabled}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={disabled}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              {/* Shipping */}
              <div className="col-span-2 text-center">
                <span className="font-causten font-bold text-accent-foreground">
                  {item.shipping > 0 ? `$${item.shipping.toFixed(2)}` : "FREE"}
                </span>
              </div>

              {/* Subtotal */}
              <div className="col-span-2 text-center">
                <span className="font-causten font-bold text-accent text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {/* Action */}
              <div className="col-span-1 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-destructive hover:bg-destructive/10 p-2"
                  onClick={() => removeItem(item.id)}
                  disabled={disabled}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              {/* Product Info */}
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                    unoptimized
                    loading="eager"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-causten font-bold text-accent text-sm truncate">
                    {item.name}
                  </h3>
                  <p className="font-causten font-bold text-xs text-alternative">
                    Color: {item.color}
                  </p>
                  <p className="font-causten font-bold text-xs text-alternative">
                    Size: {item.size}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-causten font-bold text-accent">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-destructive hover:bg-destructive/10 p-1 h-auto"
                      onClick={() => removeItem(item.id)}
                      disabled={disabled}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quantity and Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Qty:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={disabled}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center font-medium text-sm">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={disabled}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <div className="text-right">
                  <div className="text-xs font-causten font-bold text-accent-foreground">
                    Shipping:{" "}
                    {item.shipping > 0
                      ? `$${item.shipping.toFixed(2)}`
                      : "FREE"}
                  </div>
                  <div className="font-causten font-bold text-accent">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartTable;
