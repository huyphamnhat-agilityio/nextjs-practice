import { render, screen } from "@testing-library/react";
import { ROUTES } from "@/constants";
import "@testing-library/jest-dom";
import ProductCard from ".";
import { Product } from "@/interfaces";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { alt, priority, ...rest } = props;
    return <img {...rest} alt={alt} />;
  },
}));

describe("ProductCard", () => {
  const product: Product = {
    id: "1",
    brand: "mock-brand",
    category: "mock-category",
    colors: [
      {
        name: "mock-1",
        value: "mock-1",
      },
      {
        name: "mock-2",
        value: "mock-2",
      },
      {
        name: "mock-3",
        value: "mock-3",
      },
    ],
    description: "mock-description",
    image: "/mock",
    name: "mock-name",
    price: 12,
    shipping: 2,
    sizes: ["S", "M", "L"],
  };

  it("renders product information correctly", () => {
    render(<ProductCard product={product} />);

    // name
    expect(screen.getByText(product.name)).toBeInTheDocument();
    // brand
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    // price
    expect(
      screen.getByText(`$${product.price.toFixed(2)}`),
    ).toBeInTheDocument();
  });

  it("renders product image with correct alt and src", () => {
    render(<ProductCard product={product} />);

    const img = screen.getByAltText(product.name);
    expect(img).toHaveAttribute("src", product.image);
    expect(img).toHaveAttribute("alt", product.name);
  });

  it("links to the correct product page", () => {
    render(<ProductCard product={product} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", ROUTES.PRODUCT(product.id));
  });
});
