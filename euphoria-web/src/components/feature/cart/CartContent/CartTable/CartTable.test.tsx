import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartTable, { CartTableProps } from ".";

jest.mock("../CartItem", () => ({
  __esModule: true,
  default: ({ id, name, onRemove, onUpdate }: any) => (
    <div data-testid="cart-item">
      <span>{name}</span>
      <button onClick={() => onRemove(id)}>Remove</button>
      <button onClick={() => onUpdate(id, 2)}>Update</button>
    </div>
  ),
}));

describe("CartTable", () => {
  const mockUpdateQuantity = jest.fn().mockResolvedValue(undefined);
  const mockRemoveItem = jest.fn();

  const mockData: CartTableProps["data"] = [
    {
      id: "1",
      name: "Product 1",
      color: "Red",
      size: "M",
      image: "/image1.png",
      price: 100,
      shipping: 10,
      quantity: 1,
    },
    {
      id: "2",
      name: "Product 2",
      color: "Blue",
      size: "L",
      image: "/image2.png",
      price: 200,
      shipping: 0,
      quantity: 2,
    },
  ];

  it("renders table header (desktop only)", () => {
    render(
      <CartTable
        data={mockData}
        updateQuantity={mockUpdateQuantity}
        removeItem={mockRemoveItem}
      />,
    );

    expect(screen.getByText("PRODUCT DETAILS")).toBeInTheDocument();
    expect(screen.getByText("PRICE")).toBeInTheDocument();
    expect(screen.getByText("QUANTITY")).toBeInTheDocument();
    expect(screen.getByText("SHIPPING")).toBeInTheDocument();
    expect(screen.getByText("SUBTOTAL")).toBeInTheDocument();
    expect(screen.getByText("ACTION")).toBeInTheDocument();
  });

  it("renders correct number of CartItem components", () => {
    render(
      <CartTable
        data={mockData}
        updateQuantity={mockUpdateQuantity}
        removeItem={mockRemoveItem}
      />,
    );

    expect(screen.getAllByTestId("cart-item")).toHaveLength(mockData.length);
  });

  it("forwards removeItem correctly to CartItem", () => {
    render(
      <CartTable
        data={mockData}
        updateQuantity={mockUpdateQuantity}
        removeItem={mockRemoveItem}
      />,
    );

    fireEvent.click(screen.getAllByText("Remove")[0]);
    expect(mockRemoveItem).toHaveBeenCalledWith("1");
  });

  it("forwards updateQuantity correctly to CartItem", () => {
    render(
      <CartTable
        data={mockData}
        updateQuantity={mockUpdateQuantity}
        removeItem={mockRemoveItem}
      />,
    );

    fireEvent.click(screen.getAllByText("Update")[1]);
    expect(mockUpdateQuantity).toHaveBeenCalledWith("2", 2);
  });
});
