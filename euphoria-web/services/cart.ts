"use server";
import { fetchApiWithAuth } from "./fetch";

// Interfaces
import { Cart } from "@/interfaces";

// Constants
import { RESOURCES } from "@/constants";

const API_URL = process.env.API_URL ?? "";

export const getCart = async (userId: string = "") => {
  const cart = await fetchApiWithAuth<Cart>(
    `${API_URL}/${RESOURCES.CARTS}/${userId}`,
    {
      method: "GET",
    },
  );

  return cart;
};

export const updateCart = async (payload: Omit<Cart, "id">) => {
  const { userId, items } = payload;

  await fetchApiWithAuth<Cart>(`${API_URL}/${RESOURCES.CARTS}/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ items }),
  });
};
