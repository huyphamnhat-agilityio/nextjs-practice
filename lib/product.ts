import { fetchApi } from "./fetch";

// Types
import { Pagination, Product } from "@/types";

// Constants
import { LIMIT, RESOURCES } from "@/constants";

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
        next: {
          revalidate: 300,
        },
      },
    );

    return products;
  } catch (error) {
    throw new Error("There was an error when fetching product data");
  }
};

export const getAllPages = async () => {
  try {
    const products = await fetchApi<Product[]>(
      `${process.env.MOCK_API}/${RESOURCES.PRODUCT}`,
      {
        method: "GET",
        next: {
          revalidate: 300,
        },
      },
    );

    return Math.ceil(products.length / LIMIT);
  } catch (error) {
    throw new Error("There was an error when fetching product total pages");
  }
};
