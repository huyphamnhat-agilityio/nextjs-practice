"use client";
// Components
import { ProductCard } from "../common";

// Types
import { Pagination, Product } from "@/types";

const ProductList = ({ products }: { products?: Pagination<Product> }) => {
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 justify-evenly">
      {products &&
        products.data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
    </div>
  );
};

export default ProductList;
