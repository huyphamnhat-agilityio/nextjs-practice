import {
  Card,
  CardBody,
  CardHeader,
  Image as NextUIImage,
  Skeleton,
} from "@nextui-org/react";

// Components
import { Button } from "../Button";
import {
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  FavoriteIcon,
  NextArrowIcon,
  SolidStarIcon,
} from "../Icons";

// types
import { Product } from "@/types";

const ProductCardSkeleton = ({
  category,
  description,
  rate,
  originalPrice,
  salePrice,
  title,
  sales,
}: Product) => (
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

      <div>
        <Button
          color="primary"
          variant="bordered"
          size="xs"
          endContent={<NextArrowIcon />}
          className="font-bold"
        >
          Course Detail
        </Button>
      </div>
    </CardBody>
  </Card>
);

export default ProductCardSkeleton;
