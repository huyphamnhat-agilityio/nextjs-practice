import { ProductDetailContent } from "@/components/feature/product";
import { Product } from "@/interfaces";

// Mock product data
const mockProduct: Product = {
  id: "1",
  name: "Raven Hoodie With Black colored Design",
  category: "Tops",
  brand: "Euphoria",
  price: 63.0,
  image:
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "Yellow", value: "#FED835" },
    { name: "Pink", value: "#F48FB1" },
    { name: "Red", value: "#F44336" },
  ],
  description:
    "100% Bio-washed Cotton - makes the fabric extra soft & silky. Flexible ribbed crew neck. Precisely stitched with no pilling & no fading. Provide all-time comfort. Anytime, anywhere. Infinite range of matte-finish HD prints.",
};

const ProductDetail = () => {
  return <ProductDetailContent product={mockProduct} />;
};

export default ProductDetail;
