import { render } from "@testing-library/react";

// Components
import FeedbackSection from "..";

describe("FeedbackSection test cases", () => {
  const setup = () => render(<FeedbackSection />);

  it("should render correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
