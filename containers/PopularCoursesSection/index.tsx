import { ProductCard } from "@/components";
import { MOCK_PRODUCTS } from "@/mocks/product";

const PopularCoursesSection = () => {
  return (
    <section className=" bg-dark-blue mt-32.5 ">
      <div className="max-w-5xl my-0 mx-auto py-40 flex flex-col gap-20">
        <div className="flex flex-col gap-2.5">
          <h6 className="text-primary text-sm/6 font-bold">Practice Advice</h6>
          <h2 className="text-white text-5xl/12.5 font-bold">
            Our Popular Courses
          </h2>
          <p className="text-white text-sm">
            Problems trying to resolve the conflict between
            <br />
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-between">
          <ProductCard {...MOCK_PRODUCTS[0]} />
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
