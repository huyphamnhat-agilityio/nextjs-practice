// Components
import { Pagination, ProductCard } from "@/components";

// Constants
import { LIMIT } from "@/constants";

// Services
import { getProducts } from "@/services";

const PopularCoursesSection = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  const products = await getProducts(currentPage, LIMIT);
  return (
    <section>
      <div className="bg-dark-blue mt-32.5">
        <div className="max-w-lg md:max-w-4xl lg:max-w-5xl my-0 mx-auto py-40 flex flex-col gap-20">
          <div className="flex flex-col gap-2.5 text-center 2xl:text-start">
            <h6 className="text-primary text-sm/6 font-bold">
              Practice Advice
            </h6>
            <h2 className="text-white text-5xl/12.5 font-bold">
              Our Popular Courses
            </h2>
            <p className="text-white text-sm">
              Problems trying to resolve the conflict between
              <br />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          <div className="flex flex-wrap gap-10 2xl:gap-2.5 justify-evenly">
            {products.data.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <Pagination total={products.totalPages} initialPage={products.page} />
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
