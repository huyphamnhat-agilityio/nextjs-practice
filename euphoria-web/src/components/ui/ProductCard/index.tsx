import Image from "next/image";

// Components
import {
  Card,
  CardContent,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../common";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { Product } from "@/interfaces";

export type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product: { id = "", image = "", name = "", brand = "", price = 0 },
}) => {
  return (
    <Link href={{ pathname: ROUTES.PRODUCT(id) }} prefetch>
      <Card className="group cursor-pointer p-0 hover:shadow-lg transition-shadow duration-300 border-0 bg-card">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <Image
              priority
              src={image}
              alt={name}
              fetchPriority="high"
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger>
                  <h2 className="font-causten text-accent lg:max-w-25 xl:max-w-full font-semibold truncate">
                    {name}
                  </h2>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="self-start">
                  <p className="font-causten font-medium max-w-25 xl:max-w-full text-sm text-alternative truncate">
                    {brand}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{brand}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="py-2 px-4 bg-muted rounded-lg inline-flex justify-center items-center">
              <p className="font-semibold text-muted-foreground text-sm">
                ${price.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
