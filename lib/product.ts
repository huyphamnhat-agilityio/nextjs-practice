"use server";
import { fetchApi } from "./fetch";

// Types
import { Pagination, Product } from "@/types";

// Constants
import { FETCH_ERROR_MESSAGES, RESOURCES } from "@/constants";
import { notFound } from "next/navigation";

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
  console.log("data", data);
};
