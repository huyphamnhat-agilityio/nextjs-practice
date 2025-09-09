"use client";
import { QuantityControl, Button } from "@/components/ui/common";
import { CartItem as CartItemType } from "@/interfaces";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

export type CartItemProps = CartItemType & {
  quantity: number;
  onRemove: (id: string) => void;
  onUpdate: (id: string, quantity: number) => Promise<void>;
};

const CartItem = memo(
  ({
    id,
    color,
    image,
    name,
    onRemove,
    onUpdate,
    price,
    quantity,
    shipping,
    size,
  }: CartItemProps) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const didMount = useRef(false);
    const [debouncedQuantity] = useDebounce(currentQuantity, 500);

    const handleChangeQuantity = useCallback(
      async (value: number) => {
        try {
          await onUpdate(id, value);
        } catch (error) {
          const errorMessage = (error as Error).message;
          toast(errorMessage ?? "Change quantity failed", {
            style: { width: "fit-content" },
            dismissible: true,
          });
          setCurrentQuantity(quantity);
        }
      },
      [id, onUpdate, quantity],
    );

    useEffect(() => {
      if (didMount.current && debouncedQuantity !== quantity) {
        handleChangeQuantity(debouncedQuantity);
      } else {
        didMount.current = true;
      }
    }, [debouncedQuantity, handleChangeQuantity, quantity]);

    const handleRemove = useCallback(() => {
      onRemove(id);
    }, [onRemove, id]);

    return (
      <div key={`${id}-${color}`} className="p-4 lg:px-24">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
          {/* Product Details */}
          <div className="col-span-4 flex items-center space-x-4">
            <div className="w-30 h-30 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={image}
                alt={name}
                width={120}
                height={120}
                className="object-cover"
                loading="eager"
                fetchPriority="high"
                priority
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-causten font-bold text-accent text-lg truncate">
                {name}
              </h3>
              <p className="font-causten font-bold text-sm text-alternative capitalize">
                Color: {color}
              </p>
              <p className="font-causten font-bold text-sm text-alternative">
                Size: {size}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="col-span-1 text-center">
            <span className="font-causten font-bold text-accent text-lg">
              ${price.toFixed(2)}
            </span>
          </div>

          {/* Quantity */}
          <div className="col-span-2 flex items-center justify-center space-x-3">
            <QuantityControl
              quantity={currentQuantity}
              setQuantity={setCurrentQuantity}
            />
          </div>

          {/* Shipping */}
          <div className="col-span-2 text-center">
            <span className="font-causten font-bold text-accent-foreground">
              {shipping > 0 ? `$${shipping.toFixed(2)}` : "FREE"}
            </span>
          </div>

          {/* Subtotal */}
          <div className="col-span-2 text-center">
            <span className="font-causten font-bold text-accent text-lg">
              ${(price * currentQuantity).toFixed(2)}
            </span>
          </div>

          {/* Action */}
          <div className="col-span-1 text-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-destructive hover:bg-destructive/10 p-2"
              onClick={handleRemove}
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
                src={image}
                alt={name}
                width={120}
                height={120}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-causten font-bold text-accent text-sm truncate">
                {name}
              </h3>
              <p className="font-causten font-bold text-xs text-alternative">
                Color: {color}
              </p>
              <p className="font-causten font-bold text-xs text-alternative">
                Size: {size}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-causten font-bold text-accent">
                  ${price.toFixed(2)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-destructive hover:bg-destructive/10 p-1 h-auto"
                  onClick={handleRemove}
                  data-testid="remove-button"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quantity Control for Mobile */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">Qty:</span>
              <QuantityControl
                quantity={currentQuantity}
                setQuantity={setCurrentQuantity}
              />
            </div>
            <div className="text-right">
              <div className="text-xs font-causten font-bold text-accent-foreground">
                Shipping: {shipping > 0 ? `$${shipping.toFixed(2)}` : "FREE"}
              </div>
              <div className="font-causten font-bold text-accent">
                ${(price * currentQuantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CartItem.displayName = "CartItem";

export default CartItem;
