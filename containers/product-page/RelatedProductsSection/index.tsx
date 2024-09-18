import React, { Suspense } from "react";

// Components
import { ProductList, ProductListSkeleton } from "@/components";

// Constants
import { INITIAL_PAGE, PRODUCT_LIMIT } from "@/constants";

// Services
import { getProducts } from "@/lib";

const RelatedProductsSection = async ({ id }: { id: string }) => {
  const products = await getProducts({
    page: INITIAL_PAGE,
    limit: PRODUCT_LIMIT + 1,
  });

  products && products.data.some((product) => product.id === id)
    ? (products.data = products.data.filter((product) => product.id !== id))
    : products.data.pop();

  return (
    <div className="flex flex-col gap-10 mt-10">
      <h3 className="text-foreground text-4xl font-bold text-center">
        Explore related courses
      </h3>

      <Suspense fallback={<ProductListSkeleton limit={PRODUCT_LIMIT} />}>
        <ProductList products={products} />
      </Suspense>
    </div>
  );
};

export default RelatedProductsSection;
