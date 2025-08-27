"use client";
import { useState } from "react";

import { ShoppingCart } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Separator,
} from "@/components/ui/common";
import Link from "next/link";
import Image from "next/image";
import {
  ClothIcon,
  CreditCardIcon,
  ShippingIcon,
  ShippingReturnIcon,
} from "@/components/icons";

// Mock product data
const mockProduct = {
  id: "1",
  name: "Raven Hoodie With Black colored Design",
  brand: "Euphoria",
  price: 63.0,
  images: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=600&h=600&fit=crop&crop=center",
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "Yellow", value: "#FED835" },
    { name: "Pink", value: "#F48FB1" },
    { name: "Red", value: "#F44336" },
  ],
  description:
    "100% Bio-washed Cotton - makes the fabric extra soft & silky. Flexible ribbed crew neck. Precisely stitched with no pilling & no fading. Provide all-time comfort. Anytime, anywhere. Infinite range of matte-finish HD prints.",
};

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4 lg:flex lg:flex-row-reverse">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden bg-muted">
            <Image
              src={mockProduct.images[selectedImage]}
              alt={mockProduct.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex space-x-2 lg:flex-col lg:justify-center lg:gap-2">
            {mockProduct.images.map((image, index) => (
              <Button
                key={image}
                variant="image"
                onClick={() => setSelectedImage(index)}
                className={`w-20 rounded-lg border-2 p-1 ${
                  selectedImage === index ? "border-accent" : "border-border"
                }`}
              >
                <Image
                  src={image}
                  alt={`${mockProduct.name} ${index + 1}`}
                  width={68}
                  height={68}
                  className="w-full h-full object-cover rounded-lg"
                />
              </Button>
            ))}
          </div>
        </div>

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
              {mockProduct.name}
            </h1>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <h3 className="text-lg font-causten font-semibold text-quaternary-foreground">
              Select Size
            </h3>
            <div className="flex space-x-2 sm:gap-5">
              {mockProduct.sizes.map((size) => (
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
              {mockProduct.colors.map((color) => (
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

          {/* Price and Actions */}
          <div className="flex flex-col gap-2 items-start sm:flex-row  sm:items-center space-x-4">
            <Button
              className="px-10"
              font="causten"
              fontSize="lg"
              fontWeight="semibold"
              size="sm"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to cart
            </Button>
            <div className="text-lg font-causten font-bold text-accent border border-accent rounded-lg px-10 py-3">
              ${mockProduct.price.toFixed(2)}
            </div>
          </div>

          <Separator className="bg-accent-foreground" />

          {/* Product Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="w-11 h-11 flex justify-center items-center bg-muted rounded-full">
                <CreditCardIcon />
              </div>
              <span className="font-causten font-medium text-lg text-muted-foreground">
                Secure payment
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="w-11 h-11 flex justify-center items-center bg-muted rounded-full">
                <ClothIcon />
              </div>
              <span className="font-causten font-medium text-lg text-muted-foreground">
                Size & Fit
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="w-11 h-11 flex justify-center items-center bg-muted rounded-full">
                <ShippingIcon />
              </div>
              <span className="font-causten font-medium text-lg text-muted-foreground">
                Free shipping
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="w-11 h-11 flex justify-center items-center bg-muted rounded-full">
                <ShippingReturnIcon />
              </div>
              <span className="font-causten font-medium text-lg text-muted-foreground">
                Free Shipping & Returns
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12 flex flex-wrap">
        <div className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-core-sans-c font-bold text-muted-foreground">
            Product Description
          </h2>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="border-b-1 border-muted-foreground w-fit">
            <h3 className="font-causten font-medium text-muted-foreground mb-3 text-lg">
              Description
            </h3>
          </div>
          <p className="font-causten font-normal text-alternative leading-relaxed">
            {mockProduct.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
