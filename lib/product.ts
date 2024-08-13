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
        next: {
          revalidate: 300,
        },
      },
    );

    return products;
  } catch (error) {
    throw new Error(error);
  }
};
