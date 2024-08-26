import { render } from "@testing-library/react";

// Components
import Footer from "../";

describe("Footer test cases", () => {
  const setup = () => render(<Footer />);

  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
