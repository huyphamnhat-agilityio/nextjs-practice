import { render } from "@testing-library/react";
import { Label } from ".";

describe("Label components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Label />);

    expect(asFragment()).toMatchSnapshot();
  });
});
