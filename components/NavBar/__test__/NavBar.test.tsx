import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

// Components
import NavBar from "..";

describe("NavBar test cases", () => {
  const setup = () => render(<NavBar />);

  it("should render correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it("should render correctly on mobile screen", async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query == "(max-width: 767px)",
      media: "",
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    const { container } = setup();

    const menuBtn = screen.getByRole("button", {
      name: /open menu/i,
    });

    await userEvent.click(menuBtn);

    const closeBtn = screen.findByRole("button", {
      name: /close menu/i,
    });

    await userEvent.click(await closeBtn);

    expect(container).toMatchSnapshot();
  });

  it("should be able to switch the theme when clicking on switch button", async () => {
    const { container } = setup();

    const switchBtn = screen.getByRole("switch");

    await userEvent.click(switchBtn);

    expect(container).toMatchSnapshot();

    const menuBtn = screen.getByRole("button", {
      name: /open menu/i,
    });

    await userEvent.click(menuBtn);

    expect(container).toMatchSnapshot();
  });
});
