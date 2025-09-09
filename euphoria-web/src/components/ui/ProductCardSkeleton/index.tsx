import { Skeleton } from "../common";

const ProductCardSkeleton = () => {
  return (
    <div className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 border-0 bg-card animate-pulse shadow-sm">
      <div className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <Skeleton className="w-full h-full"></Skeleton>
        </div>
        <div className="p-4 flex justify-between gap-2">
          <div className="flex flex-col flex-3/4">
            <Skeleton className="h-4 rounded w-full"></Skeleton>
            <Skeleton className="h-3 rounded w-full mt-2"></Skeleton>
          </div>
          <Skeleton className="py-2 flex-1/4 rounded-lg inline-flex justify-center items-center"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
