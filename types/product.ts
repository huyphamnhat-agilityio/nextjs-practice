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
  isFavorited: boolean;
  createdAt: string;
};

export type ProductForm = Product & {
  coverImage: File;
};
