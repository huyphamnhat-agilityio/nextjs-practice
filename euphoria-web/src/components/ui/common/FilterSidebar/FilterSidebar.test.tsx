import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { CATEGORIES } from "@/constants";
import FilterSidebar from ".";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Mock Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock use-debounce
jest.mock("use-debounce", () => ({
  useDebounce: (value: any) => [value],
}));

// Mock UI components
jest.mock("../Card", () => ({
  Card: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
  CardContent: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));

jest.mock("../Slider", () => ({
  Slider: ({ value, onValueChange, disabled, ...props }: any) => (
    <input
      role="slider"
      type="range"
      value={Array.isArray(value) ? value[0] : value}
      disabled={disabled}
      onChange={(e) => {
        if (onValueChange) {
          // Simulate range slider behavior
          onValueChange([
            parseInt(e.target.value),
            Array.isArray(value) ? value[1] : 1000,
          ]);
        }
      }}
      {...props}
    />
  ),
}));

jest.mock("../Button", () => ({
  Button: ({ children, onClick, disabled, className, ...props }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock Lucide React icons
jest.mock("lucide-react", () => ({
  ChevronRight: () => <span>→</span>,
  SlidersHorizontal: () => <span>⚙️</span>,
}));

describe("FilterSidebar", () => {
  const mockReplace = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUsePathname.mockReturnValue("/");
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  it("should render correctly", () => {
    const { asFragment } = render(<FilterSidebar />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders filter header", () => {
    render(<FilterSidebar />);
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("renders all categories", () => {
    render(<FilterSidebar />);
    CATEGORIES.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("doesn't call replace when clicking the same category twice", () => {
    const searchParamsWithCategory = new URLSearchParams();
    searchParamsWithCategory.set("category_like", CATEGORIES[1].value);
    mockUseSearchParams.mockReturnValue(searchParamsWithCategory);

    render(<FilterSidebar />);
    const categoryButton = screen.getByText(CATEGORIES[1].label);

    fireEvent.click(categoryButton);

    // Should not be called since it's the same category
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("updates price range display", () => {
    render(<FilterSidebar />);

    // Check initial state
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
  });

  it("handles slider interaction", async () => {
    const mockStartTransition = jest.fn((cb) => cb());
    render(<FilterSidebar startFilterTransition={mockStartTransition} />);

    const slider = screen.getByRole("slider");

    act(() => {
      fireEvent.change(slider, { target: { value: "200" } });
    });

    // Wait for debounced effect (mocked to be immediate)
    await waitFor(() => {
      expect(mockStartTransition).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining("price_gte=200"),
        expect.objectContaining({ scroll: false }),
      );
    });
  });

  it("disables all buttons and slider when isDisabled is true", () => {
    render(<FilterSidebar isDisabled />);

    // Check category buttons are disabled
    CATEGORIES.forEach(({ label }) => {
      const button = screen.getByText(label).closest("button");
      expect(button).toBeDisabled();
    });

    // Check slider is disabled
    const slider = screen.getByRole("slider");
    expect(slider).toBeDisabled();
  });

  it("uses startFilterTransition when provided", async () => {
    const mockStartTransition = jest.fn((cb) => cb());
    render(<FilterSidebar startFilterTransition={mockStartTransition} />);

    const categoryButton = screen.getByText(CATEGORIES[1].label);
    fireEvent.click(categoryButton);

    await waitFor(() => {
      expect(mockStartTransition).toHaveBeenCalled();
    });
  });

  it("removes category filter when clicking All category", async () => {
    // Set up initial state with a category selected
    const searchParamsWithCategory = new URLSearchParams();
    searchParamsWithCategory.set("category_like", CATEGORIES[2].value);
    mockUseSearchParams.mockReturnValue(searchParamsWithCategory);

    render(<FilterSidebar />);

    // Click on a different category
    const categoryButton = screen.getByText(CATEGORIES[0].label);
    fireEvent.click(categoryButton);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        expect.not.stringContaining(`category_like`),
        expect.objectContaining({ scroll: false }),
      );
    });
  });
});
