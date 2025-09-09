import { render } from "@testing-library/react";
import NotFoundFallback from ".";

describe("NotFoundFallback components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<NotFoundFallback />);

    expect(asFragment()).toMatchSnapshot();
  });
});
