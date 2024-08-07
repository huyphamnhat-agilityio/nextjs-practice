import { Suspense } from "react";

// Components
import { Pagination, ProductList, ProductListSkeleton } from "@/components";

// Constants
import { LIMIT } from "@/constants";

// Services
import { getProducts } from "@/lib";
import { notFound } from "next/navigation";

const PopularCoursesSection = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  const products = await getProducts(currentPage, LIMIT);

  // if (!products) {
  //   notFound();
  // }

  return (
    <section>
      <div className="bg-dark-blue mt-32.5 flex justify-center">
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 py-40 flex flex-col gap-20">
          <div className="flex flex-col gap-2.5 text-center 2xl:text-start">
            <p className="text-primary text-sm/6 font-bold">Practice Advice</p>
            <h2 className="text-white text-5xl/12.5 font-bold">
              Our Popular Courses
            </h2>
            <p className="text-white text-sm">
              Problems trying to resolve the conflict between
              <br />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          <Suspense key={currentPage} fallback={<ProductListSkeleton />}>
            <ProductList currentPage={currentPage} />
          </Suspense>

          <Pagination total={products.totalPages} initialPage={products.page} />
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
