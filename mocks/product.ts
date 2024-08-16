import { MOCK_CATEGORIES } from "./category";

import { Product } from "@/types";

export const MOCK_PRODUCT_DESCRIPTION =
  "We focus on ergonomics and meeting you where you work. It's only a keystroke away.";
export const MOCK_PRODUCTS: Array<Product> = [
  {
    id: "1",
    category: MOCK_CATEGORIES[0].name,
    rate: 4.9,
    title: "Video in Live Action",
    description: MOCK_PRODUCT_DESCRIPTION,
    sales: 15,
    originalPrice: 16.48,
    salePrice: 6.48,
    coverImageUrl: "/product-cover-1.webp",
    isFavorited: false,
    createdAt: "2021-09-01T00:00:00.000Z",
  },
  {
    id: "2",
    category: MOCK_CATEGORIES[1].name,
    rate: 4.9,
    title: "Every Client Matters",
    description: MOCK_PRODUCT_DESCRIPTION,
    sales: 15,
    originalPrice: 16.48,
    salePrice: 6.48,
    coverImageUrl: "/product-cover-2.webp",
    isFavorited: false,
    createdAt: "2021-09-01T00:00:00.000Z",
  },
  {
    id: "3",
    category: MOCK_CATEGORIES[2].name,
    rate: 4.9,
    title: "Get Quality Education",
    description: MOCK_PRODUCT_DESCRIPTION,
    sales: 15,
    originalPrice: 16.48,
    salePrice: 6.48,
    coverImageUrl: "/product-cover-3.webp",
    isFavorited: false,
    createdAt: "2021-09-01T00:00:00.000Z",
  },
];
