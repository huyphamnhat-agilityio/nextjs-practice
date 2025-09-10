import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ROUTES, IMAGES } from "@/constants";
import Header, { HeaderProps } from ".";
import { SidebarProvider } from "../Sidebar";

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

const mockClearUser = jest.fn();
const mockCartStore = { cart: [{ id: "1" }], length: 1 };
jest.mock("@/stores", () => ({
  useUserStore: (selector: any) =>
    selector({ user: { email: "test@example.com" }, clearUser: mockClearUser }),
  useCartStore: (selector: any) => selector({ cart: mockCartStore.cart }),
}));

const mockLogout = jest.fn();
jest.mock("@/actions", () => ({
  logout: () => mockLogout(),
}));

describe("Header", () => {
  const setup = (props: HeaderProps = { isAuthenticated: false }) =>
    render(<Header {...props} />, { wrapper: SidebarProvider });
  beforeEach(() => {
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

    jest.clearAllMocks();
    mockPathname = ROUTES.HOME;
  });

  it("renders logo and navigation", () => {
    setup();
    expect(screen.getByAltText("Euphoria").getAttribute("src")).toContain(
      IMAGES.LOGO,
    );
    expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("shows login button if not authenticated", () => {
    setup();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });

  it("shows SearchInput on home page", () => {
    setup();
    expect(screen.getAllByPlaceholderText(/search/i)).toHaveLength(2); // desktop + mobile
  });

  it("does not show SearchInput on non-home page", () => {
    mockPathname = "/about";
    setup();
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });

  it("shows user menu and cart when authenticated", () => {
    setup({ isAuthenticated: true });
    expect(screen.getByTestId("user-button")).toBeInTheDocument();
    expect(screen.getByTestId("cart-button")).toBeInTheDocument();
  });

  it("handles logout flow", async () => {
    setup({ isAuthenticated: true });

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
    setup({ isAuthenticated: true });

    fireEvent.click(screen.getByTestId("cart-button"));
    expect(mockPush).toHaveBeenCalledWith(ROUTES.CART);
  });

  it("does not navigate to cart if already on cart page", () => {
    mockPathname = ROUTES.CART;
    setup({ isAuthenticated: true });

    fireEvent.click(screen.getByTestId("cart-button"));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
