import { render } from "@testing-library/react";

// Components
import SponsorSection from "..";

describe("SponsorSection test cases", () => {
  const setup = () => render(<SponsorSection />);

  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
