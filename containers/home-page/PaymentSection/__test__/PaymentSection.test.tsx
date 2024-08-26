import { render } from "@testing-library/react";

// Components
import PaymentSection from "..";

describe("PaymentSection test cases", () => {
  const setup = () => render(<PaymentSection />);

  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
