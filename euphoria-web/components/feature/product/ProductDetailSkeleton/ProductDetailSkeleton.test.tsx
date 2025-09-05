// ProductList.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import ProductDetailSkeleton from ".";

describe("ProductDetailSkeleton", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<ProductDetailSkeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
