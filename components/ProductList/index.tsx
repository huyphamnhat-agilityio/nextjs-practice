"use client";
// Constants
import { HOME_LIMIT, INITIAL_PAGE } from "@/constants";

// Services
import { getProducts } from "@/lib";

// Components
import { ProductCard } from "../common";

// Types
import { Pagination, Product } from "@/types";

const ProductList = ({
  // currentPage = INITIAL_PAGE,
  // limit = HOME_LIMIT,
  // query = "",
  products,
}: {
  // currentPage: number;
  // limit?: number;
  // query?: string;
  products?: Pagination<Product>;
}) => {
  // const products = await getProducts({ page: currentPage, limit, query });

  return (
    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 justify-evenly">
      {products?.data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
