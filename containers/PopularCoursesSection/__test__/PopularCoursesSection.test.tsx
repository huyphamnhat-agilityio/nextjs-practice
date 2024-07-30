import { render } from "@testing-library/react";

// Components
import PopularCoursesSection from "..";

describe("PopularCoursesSection test cases", () => {
  const setup = () => render(<PopularCoursesSection />);

  it("should render correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
