import { render } from "@testing-library/react";

// Components
import Header from "..";

describe("Header test cases", () => {
  const setup = () => render(<Header />);

  it("should render correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
