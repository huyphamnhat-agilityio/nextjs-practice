import { render } from "@testing-library/react";
import { Separator } from ".";

describe("Separator components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Separator />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with prop", () => {
    const { asFragment } = render(<Separator orientation="vertical" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
