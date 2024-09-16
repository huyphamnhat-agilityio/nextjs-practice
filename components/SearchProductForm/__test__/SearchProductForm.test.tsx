import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchProductForm from "@/components/SearchProductForm";
import { useTransition } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SearchProductForm", () => {
  const mockReplace = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  const {
    result: {
      current: [_, mockStartTransition],
    },
  } = renderHook(() => useTransition());

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUsePathname.mockReturnValue("/");
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = () =>
    render(<SearchProductForm startTransition={mockStartTransition} />);

  it("should render correctly", () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should update the query parameter when the user types", async () => {
    setup();

    const input = screen.getByRole("textbox", {
      name: /search courses\.\.\./i,
    });

    await userEvent.type(input, "React");

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith("/?page=1&query=React");
    });
  });

  it("should remove the query parameter when the input is cleared", async () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({ query: "React" }),
    );

    setup();

    const input = screen.getByPlaceholderText("Search courses...");

    await userEvent.clear(input);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith("/?page=1");
    });
  });

  it("should debounce the input changes", async () => {
    setup();

    const input = screen.getByRole("textbox", {
      name: /search courses\.\.\./i,
    });

    await userEvent.type(input, "React");

    expect(mockReplace).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith("/?page=1&query=React");
    });
  });
});
