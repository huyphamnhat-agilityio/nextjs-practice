import { MOCK_CATEGORIES } from "./category";

import { Pagination, Product } from "@/types";

export const MOCK_PRODUCT_DESCRIPTION =
  "We focus on ergonomics and meeting you where you work. It's only a keystroke away.";

export const MOCK_PRODUCTS: Array<Product> = [
  {
    id: "1",
    category: MOCK_CATEGORIES[0].name,
    rate: 4.9,
    title: "Video in Live Action",
    description: MOCK_PRODUCT_DESCRIPTION,
    sales: 0,
    originalPrice: 16.48,
    salePrice: 6.48,
    coverImageUrl: "/product-cover-1.webp",
    isFavorited: 0,
    createdAt: 0,
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
    isFavorited: 1,
    createdAt: 10,
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
    isFavorited: 0,
    createdAt: 0,
  },
  {
    id: "4",
    category: MOCK_CATEGORIES[0].name,
    rate: 4.9,
    title: "Video in Live Action",
    description: MOCK_PRODUCT_DESCRIPTION,
    sales: 15,
    originalPrice: 16.48,
    salePrice: 6.48,
    coverImageUrl: "/product-cover-1.webp",
    isFavorited: 0,
    createdAt: 0,
  },
  {
    id: "5",
    category: MOCK_CATEGORIES[1].name,
    rate: 4.9,
    title: "Every Client Matters",
    description: MOCK_PRODUCT_DESCRIPTION,
    sales: 15,
    originalPrice: 16.48,
    salePrice: 6.48,
    coverImageUrl: "/product-cover-2.webp",
    isFavorited: 1,
    createdAt: 10,
  },
  {
    id: "6",
    category: MOCK_CATEGORIES[2].name,
    rate: 4.9,
    title: "Get Quality Education",
    description: MOCK_PRODUCT_DESCRIPTION,
    sales: 15,
    originalPrice: 16.48,
    salePrice: 6.48,
    coverImageUrl: "/product-cover-3.webp",
    isFavorited: 0,
    createdAt: 0,
  },
];

export const PLACEHOLDER_PRODUCT_FORM_DATA = {
  id: "",
  category: "",
  title: "",
  description: "",
  sales: undefined,
  originalPrice: undefined,
  salePrice: undefined,
  rate: undefined,
  coverImageUrl: "",
  coverImage: undefined,
  isFavorited: 0,
  createdAt: 0,
};

export const PLACEHOLDER_PRODUCT_DESCRIPTION = "This course has no description";
