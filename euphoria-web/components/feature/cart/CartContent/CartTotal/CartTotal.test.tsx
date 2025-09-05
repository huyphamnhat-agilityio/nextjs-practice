// CartTotal.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartTotal, { CartTotalProps } from ".";

// Mock Button to avoid external styles/logic interfering
jest.mock("@/components/ui/common", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("CartTotal", () => {
  const defaultProps: CartTotalProps = {
    subtotal: 100,
    totalShipping: 20,
    grandTotal: 120,
    handleCheckout: jest.fn(),
  };

  it("renders subtotal, shipping, and grand total correctly", () => {
    render(<CartTotal {...defaultProps} />);

    expect(screen.getByText("Sub Total")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();

    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();

    expect(screen.getByText("Grand Total")).toBeInTheDocument();
    expect(screen.getByText("$120.00")).toBeInTheDocument();
  });

  it("renders checkout button", () => {
    render(<CartTotal {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /proceed to checkout/i }),
    ).toBeInTheDocument();
  });

  it("calls handleCheckout when button is clicked", async () => {
    const user = userEvent.setup();
    render(<CartTotal {...defaultProps} />);

    await user.click(
      screen.getByRole("button", { name: /proceed to checkout/i }),
    );

    expect(defaultProps.handleCheckout).toHaveBeenCalledTimes(1);
  });

  it("disables checkout button when disabled is true", () => {
    render(<CartTotal {...defaultProps} disabled />);
    expect(
      screen.getByRole("button", { name: /proceed to checkout/i }),
    ).toBeDisabled();
  });
});
