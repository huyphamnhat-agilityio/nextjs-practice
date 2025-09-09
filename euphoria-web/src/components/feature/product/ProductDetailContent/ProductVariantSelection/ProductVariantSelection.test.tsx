// ProductVariantSelection.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductVariantSelection from ".";

// Mock Button to just render a <button>
jest.mock("@/components/ui/common", () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button
      data-testid="mock-button"
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
}));

describe("ProductVariantSelection", () => {
  const sizes = ["S", "M", "L"];
  const colors = [
    { name: "Red", value: "#ff0000" },
    { name: "Blue", value: "#0000ff" },
  ];

  it("renders all sizes and colors", () => {
    render(
      <ProductVariantSelection
        sizes={sizes}
        colors={colors}
        selectedSize="M"
        setSelectedSize={jest.fn()}
        selectedColor={colors[0]}
        setSelectedColor={jest.fn()}
      />,
    );

    // Sizes
    sizes.forEach((size) => {
      expect(screen.getByText(size)).toBeInTheDocument();
    });

    // Colors (by title attribute)
    colors.forEach((color) => {
      expect(screen.getByTitle(color.name)).toBeInTheDocument();
    });
  });

  it("calls setSelectedSize when a size button is clicked", () => {
    const setSelectedSize = jest.fn();
    render(
      <ProductVariantSelection
        sizes={sizes}
        colors={colors}
        selectedSize="M"
        setSelectedSize={setSelectedSize}
        selectedColor={colors[0]}
        setSelectedColor={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByText("S"));
    expect(setSelectedSize).toHaveBeenCalledWith("S");
  });

  it("calls setSelectedColor when a color button is clicked", () => {
    const setSelectedColor = jest.fn();
    render(
      <ProductVariantSelection
        sizes={sizes}
        colors={colors}
        selectedSize="M"
        setSelectedSize={jest.fn()}
        selectedColor={colors[0]}
        setSelectedColor={setSelectedColor}
      />,
    );

    fireEvent.click(screen.getByTitle("Blue"));
    expect(setSelectedColor).toHaveBeenCalledWith(colors[1]);
  });

  it("applies correct styles for selected size and color", () => {
    render(
      <ProductVariantSelection
        sizes={sizes}
        colors={colors}
        selectedSize="M"
        setSelectedSize={jest.fn()}
        selectedColor={colors[1]}
        setSelectedColor={jest.fn()}
      />,
    );

    // "M" size should have selected class
    const selectedSizeBtn = screen.getByText("M");
    expect(selectedSizeBtn.className).toMatch(/border-muted-foreground/);

    // "Blue" color should have selected shadow class
    const selectedColorBtn = screen.getByTitle("Blue");
    expect(selectedColorBtn.className).toMatch(/shadow/);
  });
});
