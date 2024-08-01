// Constants
import { LIMIT } from "@/constants";

// Services
import { getProducts } from "@/services";

// Components
import { ProductCard } from "../common";

const ProductList = async ({ currentPage }: { currentPage: number }) => {
  const products = await getProducts(currentPage, LIMIT);

  return (
    <div className="flex flex-wrap gap-10 2xl:gap-2.5 justify-evenly">
      {products.data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
