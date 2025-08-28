"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

// Components
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Button,
  Separator,
} from "@/components/ui/common";
import ProductImageGallery from "../ProductImageGallery";
import ProductFeature from "../ProductFeature";
import ProductVariantSelection from "../ProductVariantSelection";
import ProductDescription from "../ProductDescription";

// Types
import { CartItem, Product } from "@/interfaces";

// Constants
import { ROUTES } from "@/constants";

export type ProductDetailContentProps = {
  product: Product;
  isAuthenticated?: boolean;
};
const ProductDetailContent = ({
  product: { name, description, price, colors, sizes, image },
  isAuthenticated = false,
}: ProductDetailContentProps) => {
  const [selectedSize, setSelectedSize] = useState("XS");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const { replace } = useRouter();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      replace(ROUTES.LOGIN);
      return;
    }
    const item: CartItem = {
      name,
      price,
      image,
      quantity: 1,
      color: selectedColor.value,
      size: selectedSize,
    };

    console.log(item);
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductImageGallery data={[image, image, image]} productName={name} />

        {/* Product Details */}
        <div className="space-y-6 flex flex-col gap-1 lg:gap-4">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/?category_like=Tops">Tops</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div>
            <h1 className="text-4xl font-core-sans-c font-bold text-muted-foreground">
              {name}
            </h1>
          </div>

          <ProductVariantSelection
            colors={colors}
            sizes={sizes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            setSelectedColor={setSelectedColor}
            setSelectedSize={setSelectedSize}
          />

          {/* Price and Actions */}
          <div className="flex flex-col gap-2 items-start sm:flex-row  sm:items-center space-x-4">
            <Button
              className="px-10"
              font="causten"
              fontSize="lg"
              fontWeight="semibold"
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to cart
            </Button>
            <div className="text-lg font-causten font-bold text-accent border border-accent rounded-lg px-10 py-3">
              ${price.toFixed(2)}
            </div>
          </div>

          <Separator className="bg-accent-foreground" />

          <ProductFeature />
        </div>
      </div>

      {/* Product Description */}
      <ProductDescription description={description} />
    </div>
  );
};

export default ProductDetailContent;
