import { fetchApi } from "./fetch";

// Types
import { Pagination, Product } from "@/types";

// Constants
import { RESOURCES } from "@/constants";

export const getProducts = async (page: number, limit: number) => {
  const options = {
    publicDataUrl: `${process.env.MOCK_API}/${RESOURCES.PRODUCT}`,
    page,
    limit,
  };

  try {
    const products = await fetchApi<Pagination<Product>>(
      process.env.PAGINATION_API,
      {
        method: "POST",
        body: JSON.stringify(options),
      },
    );

    return products;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Failed to fetch product data.");
  }
  // try {
  //   const products = await fetchApi<Array<Product>>(
  //     `${process.env.MOCK_API}/${RESOURCES.PRODUCT}`
  //   );

  //   console.log(products);
  // } catch (error) {
  //   console.error("Fetch Error:", error);
  //   throw new Error("Failed to fetch product data.");
  // }
};
