import {
  Card,
  CardBody,
  CardHeader,
  Image as NextUIImage,
  Skeleton,
} from "@nextui-org/react";

import { NextArrowIcon } from "../Icons";

const ProductCardSkeleton = () => (
  <Card className="max-w-82 flex flex-col rounded-none">
    <CardHeader className="relative p-0">
      <Skeleton>
        <NextUIImage width={328} height={300} radius="none" />
      </Skeleton>
      <div className="px-2.5 bg-danger absolute rounded-0.75 top-5 left-5 z-10">
        <p className="text-white text-sm/6 font-bold">Sale</p>
      </div>
    </CardHeader>
    <CardBody className="light px-6.25 pt-6.25 pb-8.75 bg-white flex flex-col gap-2.5">
      <div className="flex justify-between">
        <Skeleton className="h-8.25 w-[50%]" />
        <Skeleton className="h-8.25 w-[30%]" />
      </div>

      <Skeleton className="h-6" />

      <Skeleton className="h-5" />

      <Skeleton className="h-6" />

      <Skeleton className="h-8.5" />

      <div className="mt-auto w-fit px-5 py-2.5 text-primary text-sm font-bold flex justify-center items-center gap-2 border-medium border-primary rounded-9.25 bg-transparent hover:bg-primary hover:bg-opacity-25 transition-transform-colors-opacity cursor-pointer">
        Course Detail
        <NextArrowIcon />
      </div>
    </CardBody>
  </Card>
);

export default ProductCardSkeleton;
