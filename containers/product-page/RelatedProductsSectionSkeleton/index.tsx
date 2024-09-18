import React from "react";

// Components
import { ProductListSkeleton } from "@/components";

// Constants
import { PRODUCT_LIMIT } from "@/constants";

const RelatedProductsSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 mt-10">
      <h3 className="text-foreground text-4xl font-bold text-center">
        Explore related courses
      </h3>

      <ProductListSkeleton limit={PRODUCT_LIMIT} />
    </div>
  );
};

export default RelatedProductsSectionSkeleton;
