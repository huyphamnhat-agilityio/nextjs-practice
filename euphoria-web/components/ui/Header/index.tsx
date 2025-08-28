"use client";
import Image from "next/image";
import Link from "next/link";

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
import { HamburgerMenuIcon } from "@/components/icons";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants";

export type HeaderProps = {
  isAuthenticated?: boolean;
};

const Header = ({ isAuthenticated = false }: HeaderProps) => {
  const path = usePathname();

  const isHome = path === ROUTES.HOME;
  return (
    <header className="flex flex-col gap-2 border-b-1 p-4 md:p-6 border-b-border">
      <div className="flex items-center justify-between container mx-auto w-full px-4">
        <div className="flex items-center gap-10">
          <Image
            src="/images/logo.jpg"
            alt="Euphoria"
            width={92}
            height={45}
            className="hover:cursor-pointer"
          />
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
