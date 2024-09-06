// Mocks
import { MOCK_PRODUCTS } from "@/mocks";

// Components
import { ProductCardSkeleton } from "../common";

// Constants
import { HOME_LIMIT } from "@/constants";

const ProductListSkeleton = ({ limit = HOME_LIMIT }: { limit?: number }) => {
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 justify-evenly justify-items-center">
      {new Array(limit).fill(0).map((_, index) => (
        <ProductCardSkeleton key={index} {...MOCK_PRODUCTS[0]} />
      ))}
    </div>
  );
};

export default ProductListSkeleton;
