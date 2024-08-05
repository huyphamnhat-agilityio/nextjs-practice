import { render } from "@testing-library/react";

// Components
import { FeedbackCard, FeedbackCardProps } from "..";

// Mocks
import { MOCK_AVATARS } from "@/mocks/avatar";

describe("FeedbackCard test cases", () => {
  const setup = (props: FeedbackCardProps) =>
    render(<FeedbackCard {...props} />);

  it("should render correctly", () => {
    const { container } = setup({
      avatar: MOCK_AVATARS[0],
      comment:
        "Slate helps you see how many more days you need to work to reach your financial goal for the month and year.",
      rate: 3,
      user: {
        id: "1",
        name: "Regina Miles",
        role: "Designer",
      },
    });

    expect(container).toMatchSnapshot();
  });
});
