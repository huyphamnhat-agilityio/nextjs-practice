import { Skeleton } from "@nextui-org/react";
import Image from "next/image";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks";

// Components
import { DownloadIcon, SolidStarIcon } from "@/components";

export default async function Loading() {
  const {
    id,
    category,
    title,
    description,
    rate,
    sales,
    originalPrice,
    salePrice,
    coverImageUrl,
  } = MOCK_PRODUCTS[0];
  return (
    <main>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 pt-20 flex flex-col gap-20 mx-auto">
        <p className="text-primary text-5xl font-bold text-center">
          Course Detail
        </p>
        <div className="flex flex-col-reverse lg:flex-row gap-5 justify-between">
          <div className="max-w-full lg:max-w-[48%] flex flex-col gap-9 items-center lg:items-baseline">
            <Skeleton>
              <h5 className="text-foreground text-4xl font-bold text-center lg:text-start">
                {title}
              </h5>
            </Skeleton>

            <Skeleton>
              <p className="text-foreground-100 text-2xl text-center lg:text-start">
                {description}
              </p>
            </Skeleton>
            <div className="w-70 flex justify-between items-center">
              <Skeleton>
                <span className="text-primary text-lg/6 font-bold">
                  {category}
                </span>
              </Skeleton>
              <Skeleton>
                <div className="p-1.25 flex items-center gap-1.25 bg-dark-blue rounded-[20px]">
                  <SolidStarIcon />
                  <span className="text-white text-xs">{rate}</span>
                </div>
              </Skeleton>
            </div>
            <Skeleton>
              <div className="flex items-center gap-2.5 text-foreground-100 text-lg/6 font-bold">
                <DownloadIcon />
                {sales} Sales
              </div>
            </Skeleton>
            <Skeleton>
              <div className="flex gap-1.25">
                <span className="text-foreground-50 text-base font-bold">
                  ${originalPrice}
                </span>
                <span className="text-secondary text-base font-bold">
                  ${salePrice}
                </span>
              </div>
            </Skeleton>
          </div>
          <div className="max-w-82 max-h-75 self-center">
            <Skeleton>
              <Image src={coverImageUrl} alt={title} width={328} height={300} />
            </Skeleton>
          </div>
        </div>
      </div>
    </main>
  );
}
