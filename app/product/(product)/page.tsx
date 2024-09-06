// Constants
import { PRODUCT_LIMIT } from "@/constants";

// Components
import { SearchProductForm } from "@/components";

// Services
import { getProducts } from "@/lib";

// Sections
import { AddCourseSection, ProductListSection } from "@/containers";

export default async function Product({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  const data = await getProducts({
    page: currentPage,
    limit: PRODUCT_LIMIT,
    query,
  });

  return (
    <main>
      <div className="flex justify-center">
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 pt-20 flex flex-col gap-20 w-full">
          <p className="text-primary text-5xl font-bold text-center">
            Course List
          </p>

          <div className="flex gap-10 flex-col md:flex-row">
            <SearchProductForm />
            <AddCourseSection />
          </div>
          {data ? (
            <ProductListSection products={data} />
          ) : (
            <h2 className="text-center text-foreground ">
              Oops! No courses match your keyword.
            </h2>
          )}
        </div>
      </div>
    </main>
  );
}
