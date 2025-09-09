import { Metadata } from "next";
// Components
import { ProductPageContent } from "@/components/feature/home";

// Services
import { getProducts } from "@/services";

// Utils
import { toQueryString } from "@/utils";

export const metadata: Metadata = {
  title: "Shop",
  openGraph: {
    title: "Shop",
  },
  twitter: {
    title: "Shop",
  },
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const category = ((await searchParams).category_like ||
    "All Products") as string;

  const params = await searchParams;

  const products = await getProducts(toQueryString(params));
  return (
    <div className="container mx-auto px-4 py-6">
      <ProductPageContent category={category} products={products} />
    </div>
  );
};

export default HomePage;
