import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppSidebar from ".";

const mockClearUser = jest.fn();
const mockSetOpenMobile = jest.fn();
const mockRefresh = jest.fn();
const mockLogout = jest.fn();

jest.mock("@/stores", () => ({
  useUserStore: (selector: any) =>
    selector({ user: { email: "test@example.com" }, clearUser: mockClearUser }),
}));

jest.mock("../Sidebar", () => {
  const actual = jest.requireActual("../Sidebar");
  return {
    ...actual,
    useSidebar: () => ({ setOpenMobile: mockSetOpenMobile }),
    Sidebar: ({ children }: any) => <aside>{children}</aside>,
    SidebarContent: ({ children }: any) => <div>{children}</div>,
    SidebarGroup: ({ children }: any) => <div>{children}</div>,
    SidebarGroupContent: ({ children }: any) => <div>{children}</div>,
    SidebarGroupLabel: ({ children }: any) => (
      <div data-testid="sidebar-label">{children}</div>
    ),
    SidebarMenu: ({ children }: any) => <ul>{children}</ul>,
    SidebarMenuItem: ({ children }: any) => <li>{children}</li>,
    SidebarMenuButton: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

jest.mock("@/actions", () => ({
  logout: () => mockLogout(),
}));

jest.mock("@/components/ui/common", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// ─── Tests ──────────────────────────────────────────
describe("AppSidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders greeting when authenticated", () => {
    render(<AppSidebar isAuthenticated />);
    expect(screen.getByTestId("sidebar-label")).toHaveTextContent(
      "Hi, test@example.com!",
    );
  });

  it("renders login button when not authenticated", () => {
    render(<AppSidebar isAuthenticated={false} />);
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("closes sidebar when login button is clicked", async () => {
    const user = userEvent.setup();
    render(<AppSidebar isAuthenticated={false} />);

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mockSetOpenMobile).toHaveBeenCalledWith(false);
  });

  it("calls logout, clears user, and refreshes when logout button is clicked", async () => {
    const user = userEvent.setup();
    render(<AppSidebar isAuthenticated />);

    await user.click(screen.getByTestId("logout-button"));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockClearUser).toHaveBeenCalled();
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("closes sidebar when a menu item is clicked", async () => {
    const user = userEvent.setup();
    render(<AppSidebar isAuthenticated />);

    await user.click(screen.getByText("Shop"));

    expect(mockSetOpenMobile).toHaveBeenCalledWith(false);
  });
});
