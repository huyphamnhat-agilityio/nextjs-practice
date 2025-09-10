"use client";
import { Home } from "lucide-react";
import { useShallow } from "zustand/shallow";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
  SidebarGroupLabel,
  useSidebar,
} from "../Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Constants
import { ROUTES } from "@/constants";

// Components
import { Button } from "@/components/ui/common";

// Stores
import { useUserStore } from "@/stores";

// Actions
import { logout } from "@/actions";

const items = [
  {
    title: "Shop",
    url: ROUTES.HOME,
    icon: Home,
  },
];

export type AppsidebarProps = {
  isAuthenticated?: boolean;
};
const AppSidebar = ({ isAuthenticated = false }: AppsidebarProps) => {
  const { email, clearUser } = useUserStore(
    useShallow((state) => ({
      email: state.user?.email ?? "",
      clearUser: state.clearUser,
    })),
  );

  const { refresh } = useRouter();

  const handleLogout = async () => {
    await logout();
    handleCloseSidebar();
    clearUser();
    refresh();
  };

  const { setOpenMobile } = useSidebar();

  const handleCloseSidebar = () => setOpenMobile(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {isAuthenticated && (
            <SidebarGroupLabel>Hi, {email}!</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={handleCloseSidebar} asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                {isAuthenticated ? (
                  <Button
                    onClick={handleLogout}
                    data-testid="logout-button"
                    size="auto"
                    className="py-2 w-full"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    fontSize="lg"
                    className="px-12 w-full"
                    asChild
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link href={ROUTES.LOGIN}>Login</Link>
                  </Button>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
