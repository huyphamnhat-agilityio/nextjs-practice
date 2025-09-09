import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from ".";

jest.mock("@/components/ui", () => ({
  ProductCard: ({ product }: any) => (
    <div data-testid="product-card">{product.name}</div>
  ),
}));

describe("ProductList", () => {
  const mockProducts = [
    { id: "1", name: "Chair", price: 100, imageUrl: "/chair.png" },
    { id: "2", name: "Table", price: 200, imageUrl: "/table.png" },
  ] as any;

  it("renders a list of ProductCards", () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText("Chair")).toBeInTheDocument();
    expect(screen.getByText("Table")).toBeInTheDocument();

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      mockProducts.length,
    );
  });

  it("applies custom styles when provided", () => {
    const { container } = render(
      <ProductList products={mockProducts} style="custom-class" />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
