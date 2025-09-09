import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductImageGallery from ".";

// Mock next/image to render a regular <img> in tests
jest.mock("next/image", () => {
  const MockNextImage = ({ unoptimized, alt, ...rest }: any) => {
    return <img {...rest} alt={alt} />;
  };

  MockNextImage.displayName = "MockNextImage";

  return MockNextImage;
});

jest.mock("@/components/ui/common", () => {
  const MockButton = ({ children, onClick, className }: any) => (
    <button
      data-testid="thumbnail-button"
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );

  // ✅ Add display name
  MockButton.displayName = "MockButton";

  return {
    Button: MockButton,
  };
});

const mockImages = ["/img1.png", "/img2.png", "/img3.png"];

describe("ProductImageGallery", () => {
  it("renders main image with the first image by default", () => {
    render(<ProductImageGallery data={mockImages} productName="Chair" />);
    const mainImage = screen.getByAltText("Main Image of Chair");
    expect(mainImage).toHaveAttribute("src", mockImages[0]);
  });

  it("renders all thumbnails", () => {
    render(<ProductImageGallery data={mockImages} productName="Chair" />);
    const thumbnails = screen.getAllByTestId("thumbnail-button");
    expect(thumbnails).toHaveLength(mockImages.length);
  });

  it("changes main image when a thumbnail is clicked", () => {
    render(<ProductImageGallery data={mockImages} productName="Chair" />);
    const thumbnails = screen.getAllByTestId("thumbnail-button");

    // Click second thumbnail
    fireEvent.click(thumbnails[1]);

    const mainImage = screen.getByAltText("Main Image of Chair");
    expect(mainImage).toHaveAttribute("src", mockImages[1]);
  });

  it("applies border-accent to the selected thumbnail", () => {
    render(<ProductImageGallery data={mockImages} productName="Chair" />);
    const thumbnails = screen.getAllByTestId("thumbnail-button");

    // First one should have border-accent by default
    expect(thumbnails[0].className).toMatch(/border-accent/);

    // Click second thumbnail
    fireEvent.click(thumbnails[1]);

    expect(thumbnails[1].className).toMatch(/border-accent/);
    expect(thumbnails[0].className).not.toMatch(/border-accent/);
  });
});
