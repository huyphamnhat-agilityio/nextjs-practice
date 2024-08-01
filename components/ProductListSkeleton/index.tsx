// Mocks
import { MOCK_PRODUCTS } from "@/mocks";

// components
import { ProductCardSkeleton } from "../common";

const ProductListSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-10 2xl:gap-2.5 justify-evenly">
      <ProductCardSkeleton {...MOCK_PRODUCTS[0]} />
      <ProductCardSkeleton {...MOCK_PRODUCTS[0]} />
      <ProductCardSkeleton {...MOCK_PRODUCTS[0]} />
    </div>
  );
};

export default ProductListSkeleton;
