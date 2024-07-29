import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

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
