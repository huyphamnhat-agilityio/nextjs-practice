import { render } from "@testing-library/react";

// Components
import PaymentSection from "..";

describe("PaymentSection test cases", () => {
  const setup = () => render(<PaymentSection />);

  it("should render correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
