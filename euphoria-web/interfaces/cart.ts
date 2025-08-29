import { Product } from "./product";

export type CartItem = Pick<
  Product,
  "name" | "price" | "image" | "shipping" | "id"
> & {
  quantity: number;
  color: string;
  size: string;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
};
