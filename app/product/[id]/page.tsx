import { Image as NextUIImage } from "@nextui-org/react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Services
import { getProductById } from "@/lib";

// Constants
import { PLACEHOLDER_COURSE_IMAGE } from "@/mocks";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const product = await getProductById(id);

  if (!product) notFound();
  const {
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
  } = product;
  return (
    <main>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 pt-20 flex flex-col gap-20 mx-auto">
        <p className="text-primary text-5xl font-bold">Course Detail</p>
        <div className="flex flex-col-reverse lg:flex-row gap-5 justify-between">
          <div className="max-w-full lg:max-w-[48%] flex flex-col gap-2">
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Id:</p>
              <p>{id}</p>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Category:</p>
              <p>{category}</p>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Title:</p>
              <p>{title}</p>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Description:</p>
              <p>{description}</p>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Rate:</p>
              <p>{rate}</p>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Sales:</p>
              <p>{sales}</p>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Original Price:</p>
              <p>{originalPrice}$</p>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Sale Price:</p>
              <p> {salePrice}$</p>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Added to favorite:</p>
              <p>{isFavorited ? "Added" : "Not yet"}</p>
            </div>
            <div className="flex">
              <p className="min-w-40 lg:min-w-50">Created At:</p>
              <p> {new Date(createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="max-w-full self-center">
            <NextUIImage
              src={coverImageUrl || PLACEHOLDER_COURSE_IMAGE}
              as={Image}
              alt={`An image about ${title}`}
              width={328}
              height={300}
              isZoomed
              radius="none"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
