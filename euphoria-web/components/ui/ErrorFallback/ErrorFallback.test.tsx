import { render } from "@testing-library/react";
import ErrorFallback from ".";

describe("ErrorFallback components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<ErrorFallback />);

    expect(asFragment()).toMatchSnapshot();
  });
});
