// CartContent.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartContent from ".";

// Mocks
jest.mock("next/image", () => {
  const MockNextImage = (props: any) => <img {...props} alt="" />;
  MockNextImage.displayName = "MockNextImage";
  return MockNextImage;
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("sonner", () => ({
  toast: jest.fn(),
}));

// Mock Button to avoid shadcn styles interfering
jest.mock("@/components/ui/common", () => ({
  Button: ({ children, asChild, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock CartTable
jest.mock("./CartTable", () => {
  const MockCartTable = () => <div data-testid="cart-table" />;
  MockCartTable.displayName = "MockCartTable";
  return MockCartTable;
});

// Mock CartTotal
jest.mock("./CartTotal", () => {
  const MockCartTotal = () => <div data-testid="cart-total" />;
  MockCartTotal.displayName = "MockCartTotal";
  return MockCartTotal;
});

// Mock useCart hook
const mockUseCart = jest.fn();
jest.mock("@/hooks/cart", () => ({
  useCart: () => mockUseCart(),
}));

describe("CartContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loader when cart is loading", () => {
    mockUseCart.mockReturnValue({
      cart: [],
      isLoading: true,
      isUpdating: false,
    });

    render(<CartContent />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders empty state when cart is empty", () => {
    mockUseCart.mockReturnValue({
      cart: [],
      isLoading: false,
      isUpdating: false,
    });

    render(<CartContent />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /continue shopping/i }),
    ).toBeInTheDocument();
  });

  it("renders cart table and totals when cart has items", () => {
    mockUseCart.mockReturnValue({
      cart: [{ id: "1", name: "Test Item", quantity: 1 }],
      isLoading: false,
      isUpdating: false,
      totalPrice: 100,
      totalShipping: 10,
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<CartContent />);
    expect(screen.getByTestId("cart-table")).toBeInTheDocument();
    expect(screen.getByTestId("cart-total")).toBeInTheDocument();
  });

  it("calls handleCheckout when checkout button is clicked", async () => {
    const user = userEvent.setup();
    const clearCart = jest.fn();
    mockUseCart.mockReturnValue({
      cart: [{ id: "1", name: "Test Item", quantity: 1 }],
      isLoading: false,
      isUpdating: false,
      totalPrice: 100,
      totalShipping: 10,
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      clearCart,
    });

    render(<CartContent />);

    const cartTotal = screen.getByTestId("cart-total");
    await user.click(cartTotal);

    waitFor(() => expect(clearCart).toHaveBeenCalled());
  });
});
