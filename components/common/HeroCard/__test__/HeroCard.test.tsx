import { render } from "@testing-library/react";

// Components
import HeroCard, { HeroCardProps } from "..";

describe("HeroCard test cases", () => {
  const mockProps: HeroCardProps = {
    icon: <></>,
    iconBackgroundColor: "primary",
    title: "Test Title",
    description: "Test Description",
  };
  const setup = (props: HeroCardProps) => render(<HeroCard {...props} />);

  it("should render correctly", () => {
    const { container } = setup(mockProps);

    expect(container).toMatchSnapshot();
  });
});
