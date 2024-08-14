// Constants
import { PRODUCT_LIMIT } from "@/constants";

// Components
import { ProductListSkeleton, SearchProductForm } from "@/components";

export default async function Loading() {
  return (
    <main>
      <div className="flex justify-center">
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 pt-20 flex flex-col gap-20">
          <p className="text-primary text-5xl font-bold text-center">
            Course List
          </p>

          <SearchProductForm />
          <ProductListSkeleton limit={PRODUCT_LIMIT} />
        </div>
      </div>
    </main>
  );
}
