import { Product } from "@/interfaces";

export const mockProduct: Product = {
  id: "1",
  name: "Classic Crewneck Tee",
  image:
    "https://i.ibb.co/JwSr3r33/Mi39k-A80-I6-FTNv-GJj5-X3xof-Kbz-Kp4h-Ut-Xhi-Qlegy.jpg",
  category: "Tops",
  description: "A timeless crewneck t-shirt made from soft cotton.",
  price: 523,
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "red", value: "#82181a" },
    { name: "cyan", value: "#104e64" },
    { name: "fuchsia", value: "#721378" },
    { name: "stone", value: "#1c1917" },
  ],
  brand: "Uniqlo",
  shipping: 55,
};
