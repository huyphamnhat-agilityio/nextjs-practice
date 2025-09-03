import { ProductDetailContent } from "@/components/feature/product";
import { getProduct } from "@/services/products";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

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
