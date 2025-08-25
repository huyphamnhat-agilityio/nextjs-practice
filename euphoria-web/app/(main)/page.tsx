"use client";
import { ProductCard } from "@/components/ui";
import { FilterSidebar } from "@/components/ui/common";
import React from "react";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Black Sweatshirt with...",
    brand: "Jhanvi's Brand",
    price: 123.0,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "2",
    name: "White T-shirt",
    brand: "Nishu's Brand",
    price: 11.0,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "3",
    name: "Lavender Hoodie with...",
    brand: "Nike's Brand",
    price: 119.0,
    image:
      "https://images.unsplash.com/photo-1556821864-99e91a5accc3?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "4",
    name: "Leaves Pattern White...",
    brand: "paypal's Brand",
    price: 77.0,
    image:
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "5",
    name: "White Graphic Crop Top",
    brand: "wodEn's Brand",
    price: 29.0,
    image:
      "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "6",
    name: "Black Shorts",
    brand: "MM's Brand",
    price: 37.0,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "7",
    name: "Barbecued Grey Sweets...",
    brand: "Puya's Brand",
    price: 77.0,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "8",
    name: "Yellow Sweatshirt",
    brand: "wodEn's Brand",
    price: 29.0,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "9",
    name: "Flower Pattern Black C...",
    brand: "MM's Brand",
    price: 37.0,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "10",
    name: "I Don't Graphic T-shirt",
    brand: "brawni's Brand",
    price: 77.0,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "11",
    name: "Blue Flower Print Crop...",
    brand: "Mufasa's Brand",
    price: 29.0,
    image:
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: "12",
    name: "line Pattern Black H...",
    brand: "AS's Brand",
    price: 37.0,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
  },
];

const Shop = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">
                Women&apos;s Clothing
              </h1>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Shop;
