// ProductList.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import ProductFeature from ".";

describe("ProductFeature", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<ProductFeature />);

    expect(asFragment()).toMatchSnapshot();
  });
});
