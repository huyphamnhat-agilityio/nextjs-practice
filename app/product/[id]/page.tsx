import { Image as NextUIImage } from "@nextui-org/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Services
import { getProductById } from "@/lib";

// Constants
import { MOCK_PRODUCTS, PLACEHOLDER_COURSE_IMAGE } from "@/mocks";

// Components
import { DownloadIcon, SolidStarIcon } from "@/components";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  return {
    title: `Course ${id} Detail`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const product = await getProductById(id);

  if (!product) notFound();

  const {
    category = MOCK_PRODUCTS[0].category,
    title = MOCK_PRODUCTS[0].title,
    description = MOCK_PRODUCTS[0].description,
    rate = MOCK_PRODUCTS[0].rate,
    sales = MOCK_PRODUCTS[0].sales,
    originalPrice = MOCK_PRODUCTS[0].originalPrice,
    salePrice = MOCK_PRODUCTS[0].salePrice,
    coverImageUrl = MOCK_PRODUCTS[0].coverImageUrl,
  } = product;
  return (
    <main>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 pt-20 flex flex-col gap-20 mx-auto">
        <p className="text-primary text-5xl font-bold text-center">
          Course Detail
        </p>
        <div className="flex flex-col-reverse lg:flex-row gap-5 justify-between">
          <div className="max-w-full lg:max-w-[48%] flex flex-col gap-9 items-center lg:items-baseline">
            <h5 className="text-foreground text-4xl font-bold text-center lg:text-start">
              {title}
            </h5>
            <p className="text-foreground-100 text-2xl text-center lg:text-start">
              {description}
            </p>
            <div className="w-70 flex justify-between items-center">
              <span className="text-primary text-lg/6 font-bold">
                {category}
              </span>
              <div className="p-1.25 flex items-center gap-1.25 bg-dark-blue rounded-[20px]">
                <SolidStarIcon />
                <span className="text-white text-xs">{rate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-foreground-100 text-lg/6 font-bold">
              <DownloadIcon />
              {sales} Sales
            </div>
            <div className="flex gap-1.25">
              <span className="text-foreground-50 text-base font-bold">
                ${originalPrice}
              </span>
              <span className="text-secondary text-base font-bold">
                ${salePrice}
              </span>
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
