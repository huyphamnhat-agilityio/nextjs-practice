/* eslint-disable @next/next/no-html-link-for-pages */
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Button } from ".";

describe("Button", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Button>Click Me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("forwards refs", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it("fires onClick handler", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Press</Button>);

    fireEvent.click(screen.getByRole("button", { name: /press/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as child via Slot", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toHaveAttribute("href", "/test");
  });
});
