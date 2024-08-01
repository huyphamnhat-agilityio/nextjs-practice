import { render } from "@testing-library/react";

// Components
import { FeedbackCard, FeedbackCardProps } from "..";

// Mocks
import { MOCK_AVATARS } from "@/mocks/avatar";

describe("PaymentCard test cases", () => {
  const setup = (props: FeedbackCardProps) =>
    render(<FeedbackCard {...props} />);

  it("should render correctly", () => {
    const { container } = setup({ avatar: MOCK_AVATARS[0] });

    expect(container).toMatchSnapshot();
  });
});
