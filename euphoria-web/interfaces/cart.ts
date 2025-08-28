import { Product } from "./product";

export type CartItem = Pick<Product, "name" | "price" | "image"> & {
  quantity: number;
  color: string;
  size: string;
};
