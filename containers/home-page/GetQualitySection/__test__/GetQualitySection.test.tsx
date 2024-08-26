import { render } from "@testing-library/react";

// Components
import GetQualitySection from "..";

describe("GetQualitySection test cases", () => {
  const setup = () => render(<GetQualitySection />);

  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
