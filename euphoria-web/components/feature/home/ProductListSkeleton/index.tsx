import { ProductCardSkeleton } from "@/components/ui";

const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(9)
        .fill(null)
        .map((_, index) => (
          <ProductCardSkeleton key={index + _} />
        ))}
    </div>
  );
};

export default ProductListSkeleton;
