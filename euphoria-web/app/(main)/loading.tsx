import { ProductListSkeleton } from "@/components/feature/home";
import { FilterSidebar } from "@/components/ui/common";

export default async function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 flex-shrink-0">
          <FilterSidebar isDisabled />
        </div>

        <div className="flex-1">
          <ProductListSkeleton />
        </div>
      </div>
    </div>
  );
}
