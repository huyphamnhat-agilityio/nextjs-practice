import dynamic from "next/dynamic";
import { Suspense } from "react";

// Services
import { getProducts } from "@/lib";

// Components
import { Pagination, ProductListSkeleton } from "@/components";
import { LIMIT } from "@/constants";

const ProductList = dynamic(
  () => import("@/components").then((mod) => mod.ProductList),
  {
    ssr: false,
    loading: () => <ProductListSkeleton />,
  },
);

const PopularCoursesSection = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  const { totalPages } = await getProducts(currentPage, LIMIT);

  return (
    <section>
      <div className="bg-dark-blue mt-32.5 flex justify-center">
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 py-40 flex flex-col gap-20">
          <div className="flex flex-col gap-2.5 text-center 2xl:text-start">
            <p className="text-primary text-sm/6 font-bold">Practice Advice</p>
            <h2 className="text-white text-5xl/12.5 font-bold">
              Our Popular Courses
            </h2>
            <p className="text-white text-sm whitespace-pre-line">
              {`Problems trying to resolve the conflict between
              the two major realms of Classical physics: Newtonian mechanics`}
            </p>
          </div>

          <Suspense key={currentPage} fallback={<ProductListSkeleton />}>
            <ProductList currentPage={currentPage} />
          </Suspense>

          <Pagination total={totalPages} />
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
