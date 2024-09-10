export type Product = {
  id: string;
  category: string;
  title: string;
  description: string;
  sales: number;
  originalPrice: number;
  salePrice: number;
  rate: number;
  coverImageUrl: string;
  isFavorited: number;
  createdAt: number;
};

export type ProductForm = Product & {
  coverImage: string;
};
