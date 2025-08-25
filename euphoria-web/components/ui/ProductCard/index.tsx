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
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-foreground truncate">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <p className="font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
