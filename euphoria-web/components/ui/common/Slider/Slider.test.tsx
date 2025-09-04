import React from "react";
import { render, screen } from "@testing-library/react";
import { Slider } from "./index";

// Mock @radix-ui/react-slider
jest.mock("@radix-ui/react-slider", () => {
  const Root = React.forwardRef<HTMLDivElement, any>(
    ({ children, className, ...props }, ref) => (
      <div
        ref={ref}
        role="slider"
        className={className}
        data-testid="slider-root"
        aria-valuenow={0}
        {...props}
      >
        {children}
      </div>
    ),
  );
  Root.displayName = "SliderRoot";

  const Track = React.forwardRef<HTMLDivElement, any>(
    ({ children, className, ...props }, ref) => (
      <div
        ref={ref}
        className={className}
        data-testid="slider-track"
        {...props}
      >
        {children}
      </div>
    ),
  );
  Track.displayName = "SliderTrack";

  const Range = React.forwardRef<HTMLDivElement, any>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={className}
        data-testid="slider-range"
        {...props}
      />
    ),
  );
  Range.displayName = "SliderRange";

  const Thumb = React.forwardRef<HTMLDivElement, any>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={className}
        data-testid="slider-thumb"
        {...props}
      />
    ),
  );
  Thumb.displayName = "SliderThumb";

  return { Root, Track, Range, Thumb };
});

// Mock the cn utility function
jest.mock("@/utils/index", () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" "),
}));

describe("Slider components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Slider />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with default structure", () => {
    render(<Slider />);

    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByTestId("slider-track")).toBeInTheDocument();
    expect(screen.getByTestId("slider-range")).toBeInTheDocument();
    // Should render 2 thumbs by default (min, max fallback)
    expect(screen.getAllByTestId("slider-thumb")).toHaveLength(2);
  });

  it("should render correct number of thumbs based on single value", () => {
    render(<Slider defaultValue={[25]} />);
    expect(screen.getAllByTestId("slider-thumb")).toHaveLength(1);
  });

  it("should render multiple thumbs for multiple values", () => {
    render(<Slider defaultValue={[10, 50, 90]} />);
    expect(screen.getAllByTestId("slider-thumb")).toHaveLength(3);
  });

  it("should apply custom className", () => {
    render(<Slider className="custom-slider" />);
    expect(screen.getByRole("slider")).toHaveClass("custom-slider");
  });

  it("should forward props correctly", () => {
    render(<Slider min={10} max={90} disabled data-testid="custom-slider" />);
    const slider = screen.getByTestId("custom-slider");
    expect(slider).toHaveAttribute("min", "10");
    expect(slider).toHaveAttribute("max", "90");
    expect(slider).toHaveAttribute("disabled");
  });

  it("should apply data-slot attributes", () => {
    render(<Slider defaultValue={[50]} />);

    expect(screen.getByRole("slider")).toHaveAttribute("data-slot", "slider");
    expect(screen.getByTestId("slider-track")).toHaveAttribute(
      "data-slot",
      "slider-track",
    );
    expect(screen.getByTestId("slider-range")).toHaveAttribute(
      "data-slot",
      "slider-range",
    );
    expect(screen.getByTestId("slider-thumb")).toHaveAttribute(
      "data-slot",
      "slider-thumb",
    );
  });

  it("should handle controlled values", () => {
    render(<Slider value={[30, 70]} />);
    expect(screen.getAllByTestId("slider-thumb")).toHaveLength(2);
  });

  it("should fallback to min/max when no values provided", () => {
    render(<Slider min={5} max={95} />);
    // Should render 2 thumbs (fallback to [min, max])
    expect(screen.getAllByTestId("slider-thumb")).toHaveLength(2);
  });

  it("should prioritize value over defaultValue", () => {
    render(<Slider value={[40]} defaultValue={[20, 80]} />);
    // Should use value prop and render 1 thumb
    expect(screen.getAllByTestId("slider-thumb")).toHaveLength(1);
  });
});
