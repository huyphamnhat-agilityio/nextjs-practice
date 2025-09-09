// SearchInput.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from ".";

let initialParams: Record<string, string> = {};
const replace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/products",
  useSearchParams: () => new URLSearchParams(initialParams),
}));

beforeEach(() => {
  jest.useFakeTimers();
  replace.mockClear();
  initialParams = {}; // default to no params unless a test sets them
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

function expectReplaceCalledWithQuery(
  expectations: Record<string, string | null>,
) {
  expect(replace).toHaveBeenCalledTimes(1);
  const [urlStr, opts] = replace.mock.calls[0];
  expect(opts).toEqual({ scroll: false });

  const url = new URL(`http://localhost${urlStr}`);
  expect(url.pathname).toBe("/products");

  // assert each expected key (null means absent)
  for (const [key, value] of Object.entries(expectations)) {
    if (value === null) {
      expect(url.searchParams.has(key)).toBe(false);
    } else {
      expect(url.searchParams.get(key)).toBe(value);
    }
  }
}

describe("SearchInput", () => {
  it("renders input with default value from search params (name_like present)", () => {
    initialParams = { name_like: "chair" };
    render(<SearchInput style="relative" />);

    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input.value).toBe("chair");
  });

  it("renders empty input when no name_like param (branch: defaultValue === undefined)", () => {
    initialParams = { sort: "price" }; // no name_like
    render(<SearchInput style="relative" />);

    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("updates query after debounce when typing (adds/updates name_like and sets page=1)", async () => {
    const user = userEvent.setup({ delay: null });
    initialParams = { name_like: "chair" };

    render(<SearchInput style="relative" />);
    const input = screen.getByPlaceholderText("Search...");

    await user.clear(input);
    await user.type(input, "table");

    jest.advanceTimersByTime(500);

    expectReplaceCalledWithQuery({
      name_like: "table",
      page: "1",
    });
  });

  it("removes name_like when cleared and preserves other params; page is reset to 1", async () => {
    const user = userEvent.setup({ delay: null });
    initialParams = { name_like: "chair", sort: "price" };

    render(<SearchInput style="relative" />);
    const input = screen.getByPlaceholderText("Search...");

    await user.clear(input);
    jest.advanceTimersByTime(500);

    expectReplaceCalledWithQuery({
      name_like: null,
      sort: "price",
      page: "1",
    });
  });
});
