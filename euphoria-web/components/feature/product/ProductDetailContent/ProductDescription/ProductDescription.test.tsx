// ProductList.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import ProductDescription from ".";

describe("ProductDescription", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<ProductDescription description="mock" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
