export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  brand: string;
  price: number;
  sizes: string[];
  colors: { name: string; value: string }[];
  shipping: number;
};
