import { ProductDetailContent } from "@/components/feature/product";
import { getProduct } from "@/services/products";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const product = await getProduct(id);

  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      title: product?.name,
      description: product?.description,
      url: process.env.HOST_URL,
      type: "website",
      images: [
        {
          url: product?.image ?? "",
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product?.name,
      description: product?.description,
      images: [
        {
          url: product?.image ?? "",
          type: "image/jpeg",
        },
      ],
    },
  };
}

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const product = await getProduct((await params).id);

  if (!product) notFound();

  const isAuthenticated = (await cookies()).has("accessToken");

  return (
    <ProductDetailContent isAuthenticated={isAuthenticated} product={product} />
  );
};

export default ProductDetail;
