import React from "react";
import { Card, CardContent } from "../common";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 border-0 bg-card">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <Image
            priority
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex justify-between">
          <div className="flex flex-col">
            <h3 className="font-causten text-accent font-semibold truncate">
              {product.name}
            </h3>
            <p className="font-causten font-medium text-sm text-alternative">
              {product.brand}
            </p>
          </div>
          <div className="py-2 px-4 bg-muted rounded-lg inline-flex justify-center items-center">
            <p className="font-semibold text-muted-foreground text-sm">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
