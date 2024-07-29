import { Image as NextUIImage } from "@nextui-org/react";

// Types
import { Product } from "@/types";
import { Button } from "../Button";
import { FavoriteIcon } from "../Icons";

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
    <div className="w-82 flex flex-col">
      <div className=" h-75 relative">
        <NextUIImage
          src={coverImageUrl}
          alt={`An image about ${title}`}
          isZoomed
          radius="none"
        />
        <div className="px-2.5 bg-danger absolute rounded-0.75 top-5 left-5 z-10">
          <h6 className="text-white text-sm/6 font-bold">Sale</h6>
        </div>
        <div className="flex gap-2.5 absolute bottom-10 left-24 z-10">
          <Button className="bg-white" variant="action" size="tiny" isIconOnly>
            <FavoriteIcon />
          </Button>
          <Button className="bg-white" variant="action" size="tiny" isIconOnly>
            <FavoriteIcon />
          </Button>
          <Button className="bg-white" variant="action" size="tiny" isIconOnly>
            <FavoriteIcon />
          </Button>
        </div>
      </div>
      <div className="px-6.25 pt-6.25 pb-8.75 ">
        <p>{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
