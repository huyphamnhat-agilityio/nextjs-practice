import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HoverPrefetchLink from ".";

describe("HoverPrefetchLink", () => {
  it("renders children correctly", () => {
    render(<HoverPrefetchLink href="/about">About</HoverPrefetchLink>);
    expect(screen.getByTestId("hover-prefetch-link")).toHaveTextContent(
      "About",
    );
  });

  it("does not prefetch initially", () => {
    render(<HoverPrefetchLink href="/about">About</HoverPrefetchLink>);
    expect(screen.getByTestId("hover-prefetch-link")).toHaveAttribute(
      "data-prefetch",
      "false",
    );
  });

  it("enables prefetch when hovered", async () => {
    const user = userEvent.setup();
    render(<HoverPrefetchLink href="/about">About</HoverPrefetchLink>);

    const link = screen.getByTestId("hover-prefetch-link");
    await user.hover(link);

    // after hover, state should update to prefetch=true
    expect(link).toHaveAttribute("data-prefetch", "true");
  });
});
