// Tooltip.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from ".";

describe("Tooltip", () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it("renders trigger and render content", async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    const tooltipTrigger = screen.getByText("Hover me");

    expect(tooltipTrigger).toBeInTheDocument();

    await userEvent.hover(tooltipTrigger);

    waitFor(() => expect(screen.queryByText("Tooltip text")).toBeVisible());
  });
});
