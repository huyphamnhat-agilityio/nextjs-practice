import { MOCK_PRODUCTS } from "@/mocks";
import { Image as NextUIImage, Skeleton } from "@nextui-org/react";
import Image from "next/image";

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
    isFavorited,
    createdAt,
    coverImageUrl,
  } = MOCK_PRODUCTS[0];
  return (
    <main>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 pt-20 flex flex-col gap-20 mx-auto">
        <p className="text-primary text-5xl font-bold">Course Detail</p>
        <div className="flex flex-col-reverse lg:flex-row gap-5 justify-between">
          <div className="max-w-full lg:max-w-[48%] flex flex-col gap-2">
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Id:</p>
              <Skeleton>
                <p>{id}</p>
              </Skeleton>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Category:</p>
              <Skeleton>
                <p>{category}</p>
              </Skeleton>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Title:</p>
              <Skeleton>
                <p>{title}</p>
              </Skeleton>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Description:</p>
              <Skeleton>
                <p>{description}</p>
              </Skeleton>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Rate:</p>
              <Skeleton>
                <p>{rate}</p>
              </Skeleton>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Sales:</p>
              <Skeleton>
                <p>{sales}</p>
              </Skeleton>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Original Price:</p>
              <Skeleton>
                <p>{originalPrice}$</p>
              </Skeleton>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Sale Price:</p>
              <Skeleton>
                <p> {salePrice}$</p>
              </Skeleton>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Added to favorite:</p>
              <Skeleton>
                <p>{isFavorited ? "Added" : "Not yet"}</p>
              </Skeleton>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Created At:</p>
              <Skeleton>
                <p> {new Date(createdAt).toLocaleString()}</p>
              </Skeleton>
            </div>
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
