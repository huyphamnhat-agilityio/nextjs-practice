import Image from "next/image";
import {
  Card,
  CardBody,
  CardHeader,
  Image as NextUIImage,
} from "@nextui-org/react";

// Types
import { Product } from "@/types";

// Components
import { Button } from "../Button";
import {
  CartIcon,
  DownloadIcon,
  EyeIcon,
  FavoriteIcon,
  NextArrowIcon,
  SolidStarIcon,
} from "../Icons";

const ProductCard = ({
  category,
  coverImageUrl,
  description,
  rate,
  originalPrice,
  salePrice,
  title,
  sales,
}: Product) => {
  return (
    <Card className="max-w-82 flex flex-col rounded-none">
      <CardHeader className="relative p-0">
        <NextUIImage
          as={Image}
          src={coverImageUrl}
          alt={`An image about ${title}`}
          width={328}
          height={300}
          className="max-w-full max-h-75"
          isZoomed
          radius="none"
        />

        <div className="px-2.5 bg-danger absolute rounded-0.75 top-5 left-5 z-10">
          <p className="text-white text-sm/6 font-bold">Sale</p>
        </div>
        <div className="flex gap-2.5 absolute bottom-6 left-24 z-10">
          <Button
            className="bg-white"
            variant="action"
            size="tiny"
            aria-label="favorite button"
            isIconOnly
          >
            <FavoriteIcon />
          </Button>
          <Button
            className="bg-white"
            variant="action"
            size="tiny"
            aria-label="cart button"
            isIconOnly
          >
            <CartIcon />
          </Button>
          <Button
            className="bg-white"
            variant="action"
            size="tiny"
            aria-label="watch later button"
            isIconOnly
          >
            <EyeIcon />
          </Button>
        </div>
      </CardHeader>
      <CardBody className="light px-6.25 pt-6.25 pb-8.75 bg-white flex flex-col gap-2.5">
        <div className="flex justify-between">
          <span className="text-primary text-sm/6 font-bold">{category}</span>
          <div className="p-1.25 flex items-center gap-1.25 bg-dark-blue rounded-[20px]">
            <SolidStarIcon />
            <span className="text-white text-xs">{rate}</span>
          </div>
        </div>
        <p className="text-foreground text-base font-bold">{title}</p>
        <p className="text-foreground-100 text-sm">{description}</p>
        <div className="flex items-center gap-2.5 text-foreground-100 text-sm/6 font-bold">
          <DownloadIcon />
          {sales} Sales
        </div>
        <div className="py-1.25 px-0.75 flex gap-1.25">
          <span className="text-foreground-50 text-base font-bold">
            ${originalPrice}
          </span>
          <span className="text-secondary text-base font-bold">
            ${salePrice}
          </span>
        </div>
        <div className="mt-auto">
          <Button
            color="primary"
            variant="bordered"
            size="xs"
            endContent={<NextArrowIcon />}
            className="font-bold"
          >
            Learn More
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
