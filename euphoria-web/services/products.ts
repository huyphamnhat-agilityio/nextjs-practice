"use server";
import { fetchApiWithAuth } from "./fetch";

// Interfaces
import { Product } from "@/interfaces";

// Constants
import { RESOURCES } from "@/constants";

const API_URL = process.env.API_URL ?? "";

export const getProducts = async (query: string = "") => {
  const products = await fetchApiWithAuth<Product[]>(
    `${API_URL}/${RESOURCES.PRODUCTS}${query}`,
    {
      method: "GET",
    },
  );

  return products;
};
