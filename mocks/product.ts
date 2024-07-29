import { MOCK_CATEGORIES } from "./category";

import { Product } from "@/types";

export const MOCK_PRODUCT_TITLE =
  "We focus on ergonomics and meeting you where you work. It's only a keystroke away.";
export const MOCK_PRODUCTS: Array<Product> = [
  {
    id: "1",
    categoryId: MOCK_CATEGORIES[0].id,
    category: MOCK_CATEGORIES[0].name,
    rate: 4.9,
    title: "Video in Live Action",
    description: MOCK_PRODUCT_TITLE,
    sales: 15,
    originalPrice: 16.48,
    salePrice: 6.48,
    coverImageUrl: "/product-cover-1.png",
  },
];
