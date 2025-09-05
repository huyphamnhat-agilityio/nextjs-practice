"use client";
import Image from "next/image";
import Link from "next/link";
import { useShallow } from "zustand/shallow";
// Components
import { Button } from "../common/Button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../common/NavigationMenu";
import SearchInput from "../common/SearchInput";

// Icons
import { CartIcon, HamburgerMenuIcon, UserIcon } from "@/components/icons";
import { usePathname, useRouter } from "next/navigation";
import { IMAGES, ROUTES } from "@/constants";
import { useCartStore, useUserStore } from "@/stores";
import { Badge, Popover, PopoverContent, PopoverTrigger } from "../common";
import { logout } from "@/actions";
import { useState } from "react";

export type HeaderProps = {
  isAuthenticated?: boolean;
};

const Header = ({ isAuthenticated = false }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { email, clearUser } = useUserStore(
    useShallow((state) => ({
      email: state.user?.email ?? "",
      clearUser: state.clearUser,
    })),
  );

  const cartQuantity = useCartStore((state) => state.cart?.length ?? 0);
  const path = usePathname();

  const { refresh, push } = useRouter();

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    clearUser();
    refresh();
  };

  const handleNavigateToCart = () => {
    if (path === ROUTES.CART) return;
    push(ROUTES.CART);
  };
  const isHome = path === ROUTES.HOME;
  return (
    <header className="flex flex-col gap-2 border-b-1 p-4 md:p-6 border-b-border">
      <div className="flex items-center justify-between container mx-auto w-full px-4">
        <div className="flex items-center gap-10">
          <Link href={ROUTES.HOME}>
            <Image
              src={IMAGES.LOGO}
              alt="Euphoria"
              width={92}
              height={45}
              className="hover:cursor-pointer"
            />
          </Link>
          <nav className="hidden md:inline-flex">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/"
                  className="text-alternative text-lg hover:underline"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          {isHome && (
            <SearchInput style="relative hidden md:flex flex-1 max-w-3xl mx-8" />
          )}

          {!isAuthenticated && !path.startsWith("/login") && (
            <Button
              variant="default"
              size="sm"
              fontSize="lg"
              className="hidden md:inline-flex px-12"
              asChild
            >
              <Link href={ROUTES.LOGIN}>Login</Link>
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Popover open={isOpen}>
                <PopoverTrigger
                  asChild
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <Button variant="icon" data-testid="user-button">
                    <UserIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-4 font-causten font-normal text-base flex flex-col">
                  Hi, {email}!
                  <Button
                    onClick={handleLogout}
                    data-testid="logout-button"
                    size="auto"
                    className="py-2"
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>

              <Button
                variant="icon"
                onClick={handleNavigateToCart}
                data-testid="cart-button"
                className="relative"
              >
                <CartIcon />

                {!!cartQuantity && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1"
                  >
                    {cartQuantity}
                  </Badge>
                )}
              </Button>
            </>
          )}

          <div className="flex gap-2 items-center md:hidden">
            <NavigationMenu className="md:hidden">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <HamburgerMenuIcon width={24} height={24} />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink asChild>
                      <Link href="/">Shop</Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>

      {isHome && <SearchInput style="md:hidden relative w-full" />}
    </header>
  );
};

export default Header;
