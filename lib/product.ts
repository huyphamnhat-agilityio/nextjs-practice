"use server";
import { fetchApi } from "./fetch";

// Types
import { Pagination, Product } from "@/types";

// Constants
import { RESOURCES } from "@/constants";
import { revalidatePath } from "next/cache";

export type GetProductProps = {
  page: number;
  limit: number;
  query?: string;
};
export const getProducts = async ({
  page,
  limit,
  query = "",
}: GetProductProps) => {
  const options = {
    publicDataUrl: `${process.env.MOCK_API}/${RESOURCES.PRODUCT}?title=${query}`,
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
    if (error.status === 404 || error.status === 400) return undefined;
    throw new Error(error.message);
  }
};

export const markProduct = async (data: Product) => {
  try {
    const response = await fetchApi<Product>(
      `${process.env.MOCK_API}/${RESOURCES.PRODUCT}/${data.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ ...data, isFavorited: !data.isFavorited }),
      },
    );
    revalidatePath("/", "layout");

    return response;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (data: FormData) => {
  console.log(data.get("description"));
};
