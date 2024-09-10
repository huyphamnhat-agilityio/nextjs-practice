"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  Image as NextUIImage,
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { usePathname } from "next/navigation";

// Types
import { Product } from "@/types";

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

// Services
import { markProduct } from "@/lib";

// Constants
import { DESTINATION, MARK_FAVORITE_MESSAGES } from "@/constants";

// Models
import {
  PLACEHOLDER_COURSE_IMAGE,
  PLACEHOLDER_PRODUCT_DESCRIPTION,
} from "@/mocks";

// Components
const ConfirmProductForm = dynamic(() =>
  import("@/components").then((module) => module.ConfirmProductForm),
);

const MutationProductForm = dynamic(() =>
  import("@/components").then((module) => module.MutationProductForm),
);

const ProductCard = (props: Product) => {
  const {
    category,
    coverImageUrl,
    description,
    rate,
    originalPrice,
    salePrice,
    title,
    sales,
    isFavorited,
    id,
  } = props;

  const [isPending, setIsPending] = useState(false);

  const {
    isOpen: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onOpenChange: onConfirmModalOpenChange,
    onClose: onConfirmModalClose,
  } = useDisclosure({
    defaultOpen: false,
  });

  const {
    isOpen: isMutationModalOpen,
    onOpen: onMutationModalOpen,
    onOpenChange: onMutationModalOpenChange,
    onClose: onMutationModalClose,
  } = useDisclosure({
    defaultOpen: false,
  });

  const pathname = usePathname();

  const handleMarkFavorite = async (data: Product) => {
    try {
      setIsPending(true);

      const response = await markProduct(data);

      if (response)
        toast.success(
          response.isFavorited
            ? MARK_FAVORITE_MESSAGES.SUCCESS.MARKED
            : MARK_FAVORITE_MESSAGES.SUCCESS.UNMARKED,
        );
    } catch (error) {
      toast.error(
        props.isFavorited
          ? MARK_FAVORITE_MESSAGES.ERROR.UNMARKED
          : MARK_FAVORITE_MESSAGES.ERROR.MARKED,
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Card
        className="max-w-82 flex flex-col rounded-none"
        isDisabled={isPending}
      >
        <CardHeader className="relative p-0">
          <Link href={`${DESTINATION.PRODUCT}/${id}`}>
            <NextUIImage
              as={Image}
              src={coverImageUrl || PLACEHOLDER_COURSE_IMAGE}
              alt={`An image about ${title}`}
              width={328}
              height={300}
              className="max-w-full max-h-75"
              isZoomed
              radius="none"
              priority
            />
          </Link>

          <div className="px-2.5 bg-danger absolute rounded-0.75 top-5 left-5 z-10">
            <p className="text-white text-sm/6 font-bold">Sale</p>
          </div>
          <div className="flex gap-2.5 absolute bottom-6 left-24 z-10">
            {!(pathname === DESTINATION.HOME) && (
              <>
                <Button
                  className={`${!!isFavorited ? "bg-red-500 text-white" : "bg-white text-black"}`}
                  variant="action"
                  size="tiny"
                  aria-label="favorite button"
                  data-testid="mark-favorite"
                  isIconOnly
                  isDisabled={isPending}
                  onPress={() => handleMarkFavorite(props)}
                >
                  <FavoriteIcon />
                </Button>
                <Button
                  className="bg-white"
                  variant="action"
                  size="tiny"
                  aria-label="cart button"
                  data-testid="update"
                  isIconOnly
                  isDisabled={isPending}
                  onPress={onMutationModalOpen}
                >
                  <EditIcon />
                </Button>
                <Button
                  className="bg-white"
                  variant="action"
                  size="tiny"
                  aria-label="watch later button"
                  data-testid="delete"
                  isIconOnly
                  isDisabled={isPending}
                  onPress={onConfirmModalOpen}
                >
                  <DeleteIcon />
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardBody
          as={Link}
          href={`${DESTINATION.PRODUCT}/${id}`}
          className="light px-6.25 pt-6.25 pb-8.75 bg-white flex flex-col gap-2.5"
        >
          <div className="flex justify-between">
            <span className="text-primary text-sm/6 font-bold">{category}</span>
            <div className="w-15 py-1.25 px-2 flex justify-evenly items-center gap-1 bg-dark-blue rounded-[20px]">
              <SolidStarIcon />
              <span className="text-white text-xs">{rate.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-foreground text-base font-bold line-clamp-1">
            {title}
          </p>
          <p className="text-foreground-100 text-sm line-clamp-2">
            {description || PLACEHOLDER_PRODUCT_DESCRIPTION}
          </p>
          <div className="flex items-center gap-2.5 text-foreground-100 text-sm/6 font-bold">
            <DownloadIcon />
            {sales} Sales
          </div>
          <div className="py-1.25 px-0.75 flex gap-1.25">
            <span className="text-foreground-50 text-base font-bold">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="text-secondary text-base font-bold">
              ${salePrice.toFixed(2)}
            </span>
          </div>
          <div className="mt-auto">
            <Button
              color="primary"
              variant="bordered"
              size="xs"
              className="font-bold"
              aria-label="Go to detail page"
              endContent={<NextArrowIcon />}
            >
              Course Detail
            </Button>
          </div>
        </CardBody>
      </Card>

      {isConfirmModalOpen && (
        <ConfirmProductForm
          key={id}
          id={id}
          isOpen={isConfirmModalOpen}
          onOpen={onConfirmModalOpen}
          onClose={onConfirmModalClose}
          onOpenChange={onConfirmModalOpenChange}
        />
      )}

      {isMutationModalOpen && (
        <MutationProductForm
          isOpen={isMutationModalOpen}
          onOpen={onMutationModalOpen}
          onOpenChange={onMutationModalOpenChange}
          onClose={onMutationModalClose}
          data={props}
        />
      )}
    </>
  );
};

export default ProductCard;
