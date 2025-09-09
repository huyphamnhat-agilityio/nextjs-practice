// ProductPageContent.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPageContent from ".";

// Mocks
jest.mock("@/components/ui/common", () => ({
  FilterSidebar: ({ startFilterTransition }: any) => (
    <div
      data-testid="filter-sidebar"
      onClick={() => startFilterTransition(() => {})}
    >
      Filter Sidebar
    </div>
  ),
}));

jest.mock("../ProductList", () => {
  const Component = ({ products }: any) => (
    <div data-testid="product-list">
      {products.map((p: any) => p.name).join(",")}
    </div>
  );
  Component.displayName = "MockProductList";
  return Component;
});

jest.mock("../ProductListSkeleton", () => {
  const Component = () => (
    <div data-testid="product-list-skeleton">Loading...</div>
  );
  Component.displayName = "MockProductListSkeleton";
  return Component;
});

// Default products
const mockProducts = [
  { id: "1", name: "Chair", price: 100, imageUrl: "/chair.png" },
  { id: "2", name: "Table", price: 200, imageUrl: "/table.png" },
] as any;

describe("ProductPageContent", () => {
  beforeEach(() => {
    jest.resetModules(); // reset between tests
  });

  it("renders the category title", () => {
    render(<ProductPageContent products={mockProducts} category="Furniture" />);
    expect(screen.getByText("Furniture")).toBeInTheDocument();
  });

  it("renders ProductList when products are available", () => {
    render(<ProductPageContent products={mockProducts} category="Furniture" />);
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
    expect(screen.queryByText(/no products/i)).not.toBeInTheDocument();
  });

  it("renders empty state when no products are provided", () => {
    render(<ProductPageContent products={[]} category="Empty" />);
    expect(
      screen.getByText(/no products match with your keywords and filters/i),
    ).toBeInTheDocument();
  });

  it("renders ProductListSkeleton when filter transition is pending", async () => {
    jest.doMock("react", () => {
      const actual = jest.requireActual("react");
      return {
        ...actual,
        useTransition: () => [true, jest.fn()],
      };
    });
    const { default: ProductPageContentWithMock } = await import(".");

    render(
      <ProductPageContentWithMock
        products={mockProducts}
        category="Furniture"
      />,
    );
    expect(screen.getByTestId("product-list-skeleton")).toBeInTheDocument();
  });
});
