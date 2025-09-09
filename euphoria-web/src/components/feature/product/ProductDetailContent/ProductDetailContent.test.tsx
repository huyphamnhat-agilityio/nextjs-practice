import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductDetailContent from ".";
import { useRouter } from "next/navigation"; // ✅ import instead of require
import { toast } from "sonner"; // ✅ import instead of require

const mockUpdateCart = jest.fn();
const mockUseCart = jest.fn();

// ---- mocks ----
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: jest.fn(),
}));

jest.mock("@/hooks/cart", () => ({
  useCart: () => mockUseCart(),
}));

jest.mock("./ProductImageGallery", () => {
  const MockProductImageGallery = () => (
    <div data-testid="product-image-gallery" />
  );
  MockProductImageGallery.displayName = "MockProductImageGallery";
  return MockProductImageGallery;
});

jest.mock("./ProductFeature", () => {
  const MockProductFeature = () => <div data-testid="product-feature" />;
  MockProductFeature.displayName = "MockProductFeature";
  return MockProductFeature;
});

jest.mock("./ProductVariantSelection", () => {
  const MockProductVariantSelection = () => (
    <div data-testid="variant-selection" />
  );
  MockProductVariantSelection.displayName = "MockProductVariantSelection";
  return MockProductVariantSelection;
});

jest.mock("./ProductDescription", () => {
  const MockProductDescription = ({ description }: any) => (
    <div data-testid="product-description">{description}</div>
  );
  MockProductDescription.displayName = "MockProductDescription";
  return MockProductDescription;
});

jest.mock("@/components/ui/common", () => ({
  Breadcrumb: ({ children }: any) => <nav>{children}</nav>,
  BreadcrumbList: ({ children }: any) => <ol>{children}</ol>,
  BreadcrumbItem: ({ children }: any) => <li>{children}</li>,
  BreadcrumbLink: ({ children }: any) => <p>{children}</p>,
  BreadcrumbSeparator: () => <span>/</span>,
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  Separator: () => <hr />,
}));

// ---- test data ----
const product = {
  id: "1",
  name: "Classic Tee",
  description: "A soft cotton tee",
  price: 25,
  colors: [{ name: "Blue", value: "#00f" }],
  sizes: ["S", "M"],
  image: "/shirt.png",
  shipping: 5,
} as any;

describe("ProductDetailContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // default useRouter behavior
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(),
      push: jest.fn(),
    });

    // default useCart behavior
    mockUseCart.mockReturnValue({
      cart: [],
      updateCart: mockUpdateCart,
      isUpdating: false,
    });
  });

  it("renders product details", () => {
    render(<ProductDetailContent product={product} />);
    expect(screen.getByText("Classic Tee")).toBeInTheDocument();
    expect(screen.getByText("$25.00")).toBeInTheDocument();
    expect(screen.getByTestId("product-description")).toHaveTextContent(
      "A soft cotton tee",
    );
  });

  it("redirects to login if not authenticated", async () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValueOnce({
      replace: mockReplace,
      push: jest.fn(),
    });

    const user = userEvent.setup();
    render(<ProductDetailContent product={product} isAuthenticated={false} />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("calls updateCart and shows success toast when authenticated", async () => {
    mockUseCart.mockReturnValue({
      cart: [],
      updateCart: mockUpdateCart,
      isUpdating: false,
    });

    const user = userEvent.setup();
    render(<ProductDetailContent product={product} isAuthenticated />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    await waitFor(() => {
      expect(mockUpdateCart).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Classic Tee",
            quantity: 1,
          }),
        ]),
      );
      expect(toast).toHaveBeenCalledWith(
        "The product has been added to cart!",
        expect.any(Object),
      );
    });
  });

  it("shows error toast if updateCart fails", async () => {
    mockUpdateCart.mockRejectedValueOnce(new Error("Cart update failed"));
    mockUseCart.mockReturnValue({
      cart: [],
      updateCart: mockUpdateCart,
      isUpdating: false,
    });

    const user = userEvent.setup();
    render(<ProductDetailContent product={product} isAuthenticated />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        "Cart update failed",
        expect.any(Object),
      );
    });
  });
});
