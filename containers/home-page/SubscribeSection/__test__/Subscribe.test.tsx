import { render } from "@testing-library/react";

// Components
import SubscribeSection from "..";

describe("SubscribeSection test cases", () => {
  const setup = () => render(<SubscribeSection />);

  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
