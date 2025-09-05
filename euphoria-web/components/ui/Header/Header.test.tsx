// Header.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ROUTES, IMAGES } from "@/constants";
import Header from ".";

// Mock next/navigation
const mockPush = jest.fn();
const mockRefresh = jest.fn();
let mockPathname: string = ROUTES.HOME;

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { alt, ...rest } = props;
    return <img {...rest} alt={alt} />;
  },
}));

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  useSearchParams: () =>
    new URLSearchParams({
      name_like: "shirt",
    }),
}));

// Mock store
const mockClearUser = jest.fn();
jest.mock("@/stores", () => ({
  useUserStore: (selector: any) =>
    selector({ user: { email: "test@example.com" }, clearUser: mockClearUser }),
}));

// Mock logout action
const mockLogout = jest.fn();
jest.mock("@/actions", () => ({
  logout: () => mockLogout(),
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname = ROUTES.HOME; // reset to home
  });

  it("renders logo and navigation", () => {
    render(<Header />);
    expect(screen.getByAltText("Euphoria").getAttribute("src")).toContain(
      IMAGES.LOGO,
    );
    expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("shows login button if not authenticated", () => {
    render(<Header isAuthenticated={false} />);
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });

  it("shows SearchInput on home page", () => {
    render(<Header />);
    expect(screen.getAllByPlaceholderText(/search/i)).toHaveLength(2); // desktop + mobile
  });

  it("does not show SearchInput on non-home page", () => {
    mockPathname = "/about";
    render(<Header />);
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });

  it("shows user menu and cart when authenticated", () => {
    render(<Header isAuthenticated={true} />);
    expect(screen.getByTestId("user-button")).toBeInTheDocument();
    expect(screen.getByTestId("cart-button")).toBeInTheDocument();
  });

  it("handles logout flow", async () => {
    render(<Header isAuthenticated={true} />);

    // open popover
    fireEvent.click(screen.getByTestId("user-button"));
    // click logout
    fireEvent.click(screen.getByText(/logout/i));

    waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockClearUser).toHaveBeenCalled();
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("navigates to cart if not already there", () => {
    render(<Header isAuthenticated={true} />);
    fireEvent.click(screen.getByTestId("cart-button"));
    expect(mockPush).toHaveBeenCalledWith(ROUTES.CART);
  });

  it("does not navigate to cart if already on cart page", () => {
    mockPathname = ROUTES.CART;
    render(<Header isAuthenticated={true} />);
    fireEvent.click(screen.getByTestId("cart-button"));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
