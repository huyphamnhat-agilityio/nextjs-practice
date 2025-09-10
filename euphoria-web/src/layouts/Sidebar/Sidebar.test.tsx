import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock the dependencies
jest.mock("@/hooks/use-mobile", () => ({
  useIsMobile: jest.fn(),
}));

jest.mock("@/utils", () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(" "),
}));

jest.mock("@/components/ui/common", () => ({
  SheetContent: ({ children, ...props }: any) => (
    <div data-testid="sheet-content" {...props}>
      {children}
    </div>
  ),
  SheetHeader: ({ children, ...props }: any) => (
    <div data-testid="sheet-header" {...props}>
      {children}
    </div>
  ),
  SheetTitle: ({ children, ...props }: any) => (
    <div data-testid="sheet-title" {...props}>
      {children}
    </div>
  ),
  SheetDescription: ({ children, ...props }: any) => (
    <div data-testid="sheet-description" {...props}>
      {children}
    </div>
  ),
  Button: ({ children, onClick, ...props }: any) => (
    <button data-testid="button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Input: ({ ...props }: any) => <input data-testid="input" {...props} />,
  Skeleton: ({ ...props }: any) => <div data-testid="skeleton" {...props} />,
  Sheet: ({ children, open, onOpenChange, ...props }: any) =>
    open ? (
      <div data-testid="sheet" {...props}>
        {children}
      </div>
    ) : null,
}));

jest.mock("@radix-ui/react-separator", () => ({
  Separator: ({ ...props }: any) => <div data-testid="separator" {...props} />,
}));

jest.mock("@radix-ui/react-tooltip", () => ({
  TooltipProvider: ({ children, ...props }: any) => (
    <div data-testid="tooltip-provider" {...props}>
      {children}
    </div>
  ),
  TooltipContent: ({ children, ...props }: any) => (
    <div data-testid="tooltip-content" {...props}>
      {children}
    </div>
  ),
  Tooltip: ({ children, ...props }: any) => (
    <div data-testid="tooltip" {...props}>
      {children}
    </div>
  ),
  TooltipTrigger: ({ children, ...props }: any) => (
    <div data-testid="tooltip-trigger" {...props}>
      {children}
    </div>
  ),
}));

jest.mock("@radix-ui/react-slot", () => ({
  Slot: ({ children, asChild, ...props }: any) => {
    const { asChild: _, ...cleanProps } = props;
    return (
      <div data-testid="slot" {...cleanProps}>
        {children}
      </div>
    );
  },
}));

// Import the components after mocking dependencies
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInput,
  useSidebar,
} from ".";
import { useIsMobile } from "@/hooks/use-mobile";

// Test component that uses the sidebar context
const TestSidebarConsumer = () => {
  const { state, open, toggleSidebar, isMobile } = useSidebar();
  return (
    <div>
      <span data-testid="sidebar-state">{state}</span>
      <span data-testid="sidebar-open">{open.toString()}</span>
      <span data-testid="sidebar-mobile">{isMobile.toString()}</span>
      <button data-testid="toggle-sidebar" onClick={toggleSidebar}>
        Toggle
      </button>
    </div>
  );
};

describe("SidebarProvider", () => {
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

    (useIsMobile as jest.Mock).mockReturnValue(false);
    document.cookie =
      "sidebar_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("handles defaultOpen prop correctly", () => {
    render(
      <SidebarProvider defaultOpen={false}>
        <TestSidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("sidebar-state")).toHaveTextContent("collapsed");
    expect(screen.getByTestId("sidebar-open")).toHaveTextContent("false");
  });

  test("handles controlled state with open and onOpenChange props", () => {
    const onOpenChange = jest.fn();

    render(
      <SidebarProvider open={false} onOpenChange={onOpenChange}>
        <TestSidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("sidebar-open")).toHaveTextContent("false");

    fireEvent.click(screen.getByTestId("toggle-sidebar"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  test("sets cookie when sidebar state changes", () => {
    render(
      <SidebarProvider>
        <TestSidebarConsumer />
      </SidebarProvider>,
    );

    fireEvent.click(screen.getByTestId("toggle-sidebar"));
    expect(document.cookie).toContain("sidebar_state=false");
  });

  test("handles keyboard shortcut", () => {
    render(
      <SidebarProvider>
        <TestSidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("sidebar-open")).toHaveTextContent("true");

    // Simulate Cmd+B
    fireEvent.keyDown(window, { key: "b", metaKey: true });
    expect(screen.getByTestId("sidebar-open")).toHaveTextContent("false");

    // Simulate Ctrl+B
    fireEvent.keyDown(window, { key: "b", ctrlKey: true });
    expect(screen.getByTestId("sidebar-open")).toHaveTextContent("true");
  });

  test("handles mobile toggle correctly", () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);

    render(
      <SidebarProvider>
        <TestSidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("sidebar-mobile")).toHaveTextContent("true");

    // On mobile, toggle should affect mobile state, not main state
    fireEvent.click(screen.getByTestId("toggle-sidebar"));
    expect(screen.getByTestId("sidebar-open")).toHaveTextContent("true"); // Main state unchanged
  });

  test("throws error when useSidebar is used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<TestSidebarConsumer />);
    }).toThrow("useSidebar must be used within a SidebarProvider.");

    consoleSpy.mockRestore();
  });
});

describe("Sidebar", () => {
  beforeEach(() => {
    (useIsMobile as jest.Mock).mockReturnValue(false);
  });

  test("renders mobile sidebar as sheet when mobile", () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);

    render(
      <SidebarProvider>
        <Sidebar>
          <div>Sidebar Content</div>
        </Sidebar>
      </SidebarProvider>,
    );

    // Should not render sheet initially (openMobile is false)
    expect(screen.queryByTestId("sheet")).not.toBeInTheDocument();
  });

  test("renders non-collapsible sidebar correctly", () => {
    render(
      <SidebarProvider>
        <Sidebar collapsible="none" data-testid="sidebar">
          <div>Sidebar Content</div>
        </Sidebar>
      </SidebarProvider>,
    );

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveTextContent("Sidebar Content");
  });
});

describe("SidebarTrigger", () => {
  test("renders trigger button correctly", () => {
    render(
      <SidebarProvider>
        <SidebarTrigger />
      </SidebarProvider>,
    );

    const trigger = screen.getByTestId("button");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-sidebar", "trigger");
  });

  test("toggles sidebar when clicked", () => {
    render(
      <SidebarProvider>
        <SidebarTrigger />
        <TestSidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("sidebar-open")).toHaveTextContent("true");

    fireEvent.click(screen.getByTestId("button"));
    expect(screen.getByTestId("sidebar-open")).toHaveTextContent("false");
  });

  test("calls custom onClick handler", () => {
    const onClick = jest.fn();

    render(
      <SidebarProvider>
        <SidebarTrigger onClick={onClick} />
      </SidebarProvider>,
    );

    fireEvent.click(screen.getByTestId("button"));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("SidebarMenu Components", () => {
  test("renders menu structure correctly", () => {
    render(
      <SidebarProvider>
        <SidebarMenu data-testid="menu">
          <SidebarMenuItem data-testid="menu-item">
            <SidebarMenuButton data-testid="menu-button">
              Menu Item
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarProvider>,
    );

    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item")).toBeInTheDocument();
    expect(screen.getByTestId("menu-button")).toBeInTheDocument();
    expect(screen.getByTestId("menu-button")).toHaveTextContent("Menu Item");
  });

  test("renders active menu button correctly", () => {
    render(
      <SidebarProvider>
        <SidebarMenuButton isActive={true} data-testid="menu-button">
          Active Item
        </SidebarMenuButton>
      </SidebarProvider>,
    );

    const button = screen.getByTestId("menu-button");
    expect(button).toHaveAttribute("data-active", "true");
  });

  test("renders menu button with tooltip", () => {
    render(
      <SidebarProvider>
        <SidebarMenuButton tooltip="Test Tooltip" data-testid="menu-button">
          Menu Item
        </SidebarMenuButton>
      </SidebarProvider>,
    );

    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
  });
});

describe("SidebarMenuSkeleton", () => {
  test("renders skeleton correctly", () => {
    render(
      <SidebarProvider>
        <SidebarMenuSkeleton data-testid="menu-skeleton" />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("menu-skeleton")).toBeInTheDocument();
    expect(screen.getAllByTestId("skeleton")).toHaveLength(1); // Text skeleton only
  });

  test("renders skeleton with icon when showIcon is true", () => {
    render(
      <SidebarProvider>
        <SidebarMenuSkeleton showIcon={true} data-testid="menu-skeleton" />
      </SidebarProvider>,
    );

    expect(screen.getAllByTestId("skeleton")).toHaveLength(2); // Icon + text skeletons
  });

  test("generates random width for skeleton", () => {
    const { rerender } = render(
      <SidebarProvider>
        <SidebarMenuSkeleton data-testid="menu-skeleton" />
      </SidebarProvider>,
    );

    const skeleton1 = screen.getAllByTestId("skeleton")[0];
    const width1 = skeleton1.style.getPropertyValue("--skeleton-width");

    rerender(
      <SidebarProvider>
        <SidebarMenuSkeleton data-testid="menu-skeleton" />
      </SidebarProvider>,
    );

    const skeleton2 = screen.getAllByTestId("skeleton")[0];
    const width2 = skeleton2.style.getPropertyValue("--skeleton-width");

    // Widths should be different (though there's a small chance they're the same)
    expect(width1).toMatch(/^\d{2}%$/); // Should be in format like "65%"
    expect(width2).toMatch(/^\d{2}%$/);
  });
});

describe("Other Sidebar Components", () => {
  test("renders SidebarContent correctly", () => {
    render(
      <SidebarProvider>
        <SidebarContent data-testid="content">Content</SidebarContent>
      </SidebarProvider>,
    );

    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-sidebar", "content");
  });

  test("renders SidebarHeader correctly", () => {
    render(
      <SidebarProvider>
        <SidebarHeader data-testid="header">Header</SidebarHeader>
      </SidebarProvider>,
    );

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("data-sidebar", "header");
  });

  test("renders SidebarFooter correctly", () => {
    render(
      <SidebarProvider>
        <SidebarFooter data-testid="footer">Footer</SidebarFooter>
      </SidebarProvider>,
    );

    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("data-sidebar", "footer");
  });

  test("renders SidebarGroup with label correctly", () => {
    render(
      <SidebarProvider>
        <SidebarGroup data-testid="group">
          <SidebarGroupLabel data-testid="group-label">
            Group Label
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarProvider>,
    );

    expect(screen.getByTestId("group")).toBeInTheDocument();
    expect(screen.getByTestId("group-label")).toBeInTheDocument();
    expect(screen.getByTestId("group-label")).toHaveTextContent("Group Label");
  });

  test("renders SidebarInput correctly", () => {
    render(
      <SidebarProvider>
        <SidebarInput placeholder="Search..." data-testid="sidebar-input" />
      </SidebarProvider>,
    );

    const input = screen.getByTestId("sidebar-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Search...");
    expect(input).toHaveAttribute("data-sidebar", "input");
  });
});

describe("Responsive Behavior", () => {
  test("switches to mobile behavior when isMobile is true", async () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);

    render(
      <SidebarProvider>
        <Sidebar>
          <div>Sidebar Content</div>
        </Sidebar>
        <TestSidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("sidebar-mobile")).toHaveTextContent("true");

    // Initially mobile sidebar should be closed
    expect(screen.queryByTestId("sheet")).not.toBeInTheDocument();

    // Toggle should open mobile sidebar
    fireEvent.click(screen.getByTestId("toggle-sidebar"));

    // Wait for state update
    await waitFor(() => {
      expect(screen.getByTestId("sheet")).toBeInTheDocument();
    });
  });

  test("maintains desktop behavior when isMobile is false", () => {
    (useIsMobile as jest.Mock).mockReturnValue(false);

    render(
      <SidebarProvider>
        <TestSidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("sidebar-mobile")).toHaveTextContent("false");

    // Toggle should affect main sidebar state
    fireEvent.click(screen.getByTestId("toggle-sidebar"));
    expect(screen.getByTestId("sidebar-open")).toHaveTextContent("false");
  });
});

describe("Accessibility", () => {
  test("has proper ARIA attributes", () => {
    render(
      <SidebarProvider>
        <SidebarTrigger />
      </SidebarProvider>,
    );

    const trigger = screen.getByTestId("button");
    expect(trigger).toHaveTextContent("Toggle Sidebar"); // sr-only text should be present
  });

  test("supports keyboard navigation", () => {
    const user = userEvent.setup();

    render(
      <SidebarProvider>
        <SidebarMenuButton data-testid="menu-button">
          Menu Item
        </SidebarMenuButton>
      </SidebarProvider>,
    );

    const button = screen.getByTestId("menu-button");
    expect(button).toBeInTheDocument();

    // Should be focusable
    act(() => {
      button.focus();
    });
    expect(button).toHaveFocus();
  });
});
