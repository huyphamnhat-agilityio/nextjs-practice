import { render } from "@testing-library/react";

// Components
import HeroSection from "..";

describe("HeroSection test cases", () => {
  const setup = () => render(<HeroSection />);

  it("should render correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
