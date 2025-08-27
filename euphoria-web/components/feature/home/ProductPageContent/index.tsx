"use client";
import { useTransition } from "react";

// Components
import { FilterSidebar } from "@/components/ui/common";
import ProductList from "../ProductList";
import ProductListSkeleton from "../ProductListSkeleton";

// Types
import { Product } from "@/interfaces";

export type ProductPageContentProps = {
  products: Product[];
  category: string;
};

const ProductPageContent = ({
  products,
  category = "All Products",
}: ProductPageContentProps) => {
  const [isFilterPending, startFilterTransition] = useTransition();

  const renderProductList = () =>
    products.length > 0 ? (
      <ProductList products={products} />
    ) : (
      <p className="text-alternative text-xl font-causten font-semibold text-center">
        No products match with your keywords and filters.
      </p>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-64 flex-shrink-0">
        <FilterSidebar startFilterTransition={startFilterTransition} />
      </div>

      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-">{category}</h1>
        </div>

        {isFilterPending ? <ProductListSkeleton /> : renderProductList()}
      </div>
    </div>
  );
};

export default ProductPageContent;
