"use server";
import { fetchApi } from "./fetch";

// Interfaces
import { Product } from "@/interfaces";

// Constants
import { RESOURCES } from "@/constants";

const API_URL = process.env.API_URL ?? "";

export const getProducts = async (query: string = "") => {
  const products = await fetchApi<Product[]>(
    `${API_URL}/${RESOURCES.PRODUCTS}${query}`,
    {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    },
  );

  return products;
};

export const getProduct = async (id: string) => {
  try {
    const product = await fetchApi<Product>(
      `${API_URL}/${RESOURCES.PRODUCTS}/${id}`,
      {
        method: "GET",
        cache: "force-cache",
        next: {
          revalidate: 3600,
        },
      },
    );
    return product;
  } catch (error) {
    if ((error as Error).message === "{}") return undefined;
    throw error;
  }
};
