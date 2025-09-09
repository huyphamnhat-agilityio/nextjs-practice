import { render } from "@testing-library/react";
import Footer from ".";

describe("Footer components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
