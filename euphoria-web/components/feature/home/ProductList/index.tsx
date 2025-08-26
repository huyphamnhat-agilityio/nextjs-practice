import { ProductCard } from "@/components/ui";
import { Product } from "@/interfaces";
import { cn } from "@/utils";

export type ProductListProps = {
  products: Product[];
  style?: string;
};
const ProductList = ({ products, style }: ProductListProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        style,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
