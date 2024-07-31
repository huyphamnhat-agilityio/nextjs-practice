import { render } from "@testing-library/react";

// Components
import PaymentCard, { PaymentCardProps } from "..";

describe("PaymentCard test cases", () => {
  const setup = (props?: PaymentCardProps) =>
    render(<PaymentCard {...props} />);

  it("should render correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it("should render correctly with new badge", () => {
    const { container } = setup({ isNew: true });

    expect(container).toMatchSnapshot();
  });
});
