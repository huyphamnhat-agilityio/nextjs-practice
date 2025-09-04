import { render } from "@testing-library/react";
import { Toaster } from ".";

describe("Toaster components", () => {
  // Mock window.matchMedia for jsdom
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("should render correctly", () => {
    const { asFragment } = render(<Toaster />);

    expect(asFragment()).toMatchSnapshot();
  });
});
