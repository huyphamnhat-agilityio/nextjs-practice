import { render } from "@testing-library/react";
import React from "react";
import { Badge } from ".";

describe("Badge", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Badge />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with asChild prop", () => {
    const { asFragment } = render(<Badge asChild />);
    expect(asFragment()).toMatchSnapshot();
  });
});
