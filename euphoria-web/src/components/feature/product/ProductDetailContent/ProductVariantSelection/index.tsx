"use client";

import { Dispatch, SetStateAction } from "react";

// Components
import { Button } from "@/components/ui/common";

export type ProductVariantSelectionProps = {
  sizes: string[];
  colors: { name: string; value: string }[];
  selectedSize: string;
  setSelectedSize: Dispatch<SetStateAction<string>>;
  selectedColor: { name: string; value: string };
  setSelectedColor: Dispatch<SetStateAction<{ name: string; value: string }>>;
};
const ProductVariantSelection = ({
  sizes,
  colors,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}: ProductVariantSelectionProps) => {
  return (
    <>
      {/* Size Selection */}
      <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
        <h2 className="text-lg font-causten font-semibold text-quaternary-foreground">
          Select Size
        </h2>
        <div className="flex space-x-2 sm:gap-5">
          {sizes.map((size) => (
            <Button
              key={size}
              font="causten"
              fontWeight="medium"
              fontSize="sm"
              variant="outline"
              onClick={() => setSelectedSize(size)}
              className={`w-[42px] h-[42px] rounded-xl border-2 transition-colors ${
                selectedSize === size
                  ? "border-muted-foreground bg-muted-foreground text-muted"
                  : "border-accent-foreground bg-background text-muted-foreground hover:text-muted hover:border-muted-foreground"
              }`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
        <h3 className="text-lg font-causten font-semibold text-quaternary-foreground">
          Colours Available
        </h3>
        <div className="flex space-x-2 gap-2">
          {colors.map((color) => (
            <Button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              variant="color"
              size="auto"
              className={`w-8 h-8 transition-colors ${
                selectedColor.name === color.name
                  ? "shadow-[0_0_0_4px_white,0_0_0_6px_black]"
                  : ""
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductVariantSelection;
