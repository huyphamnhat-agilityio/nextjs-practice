// ProductList.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import ProductListSkeleton from ".";

describe("ProductList", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<ProductListSkeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
