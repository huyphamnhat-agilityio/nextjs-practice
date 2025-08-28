import { Product } from "./product";

export type CartItem = Pick<
  Product,
  "name" | "price" | "image" | "shipping"
> & {
  id: string;
  quantity: number;
  color: string;
  size: string;
};
