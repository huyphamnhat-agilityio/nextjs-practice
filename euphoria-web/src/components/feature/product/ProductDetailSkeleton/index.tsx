import ProductFeature from "../ProductDetailContent/ProductFeature";
import { ShoppingCart } from "lucide-react";

// Components
import { Button, Separator, Skeleton } from "@/components/ui/common";

const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4 lg:flex lg:flex-row-reverse">
          {/* Main Image Skeleton*/}
          <div className="aspect-square overflow-hidden bg-muted">
            <Skeleton className=" w-full h-full" />
          </div>

          {/* Thumbnail Gallery Skeleton*/}
          <div className="flex space-x-2 lg:flex-col lg:justify-center lg:gap-2">
            <Skeleton className="w-20 h-20 rounded-lg" />
            <Skeleton className="w-20 h-20 rounded-lg" />
            <Skeleton className="w-20 h-20 rounded-lg" />
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6 flex flex-col gap-1 lg:gap-4">
          {/* Breadcrumb Skeleton*/}
          <Skeleton className="mb-6 w-20 h-4" />
          <div>
            <Skeleton className="w-full h-10" />
          </div>

          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <h3 className="text-lg font-causten font-semibold text-quaternary-foreground">
              Select Size
            </h3>
            <div className="flex space-x-2 sm:gap-5">
              <Skeleton className="w-[42px] h-[42px] rounded-xl" />
              <Skeleton className="w-[42px] h-[42px] rounded-xl" />
              <Skeleton className="w-[42px] h-[42px] rounded-xl" />
              <Skeleton className="w-[42px] h-[42px] rounded-xl" />
              <Skeleton className="w-[42px] h-[42px] rounded-xl" />
              <Skeleton className="w-[42px] h-[42px] rounded-xl" />
            </div>
          </div>

          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <h3 className="text-lg font-causten font-semibold text-quaternary-foreground">
              Colours Available
            </h3>
            <div className="flex space-x-2 gap-2">
              <Skeleton className="w-8 h-8 transition-colors" />
              <Skeleton className="w-8 h-8 transition-colors" />
              <Skeleton className="w-8 h-8 transition-colors" />
              <Skeleton className="w-8 h-8 transition-colors" />
            </div>
          </div>
          {/* Price and Actions Skeleton */}
          <div className="flex flex-col gap-2 items-start sm:flex-row  sm:items-center space-x-4">
            <Button
              className="px-10"
              font="causten"
              fontSize="lg"
              fontWeight="semibold"
              size="sm"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to cart
            </Button>
            <Skeleton className=" border border-accent rounded-lg w-35 h-13"></Skeleton>
          </div>

          <Separator className="bg-accent-foreground" />

          <ProductFeature />
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12 flex flex-col">
        <div className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-core-sans-c font-bold text-muted-foreground">
            Product Description
          </h2>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="border-b-1 border-muted-foreground w-fit">
            <h3 className="font-causten font-medium text-muted-foreground mb-3 text-lg">
              Description
            </h3>
          </div>
          <Skeleton className="h-7" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
