"use server";
import Image from "next/image";
import { Button } from "../common/Button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../common/NavigationMenu";
import { HamburgerMenuIcon } from "@/components/icons";
import { cookies } from "next/headers";
import SearchInput from "../common/SearchInput";

export type HeaderProps = {
  includeSearch?: boolean;
};

const Header = async ({ includeSearch }: HeaderProps) => {
  const isAuthenticated = (await cookies()).has("accessToken");
  return (
    <header className="flex flex-col gap-2 border-b-1 p-4 md:p-6 border-b-border">
      <div className="flex items-center justify-between ">
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

        {/* Search Bar */}
        {includeSearch && (
          <SearchInput style="relative w-full hidden md:flex flex-1 max-w-3xl mx-8" />
        )}

        {!isAuthenticated && (
          <Button
            variant="default"
            size="sm"
            fontSize="lg"
            className="hidden md:inline-flex px-12"
          >
            Login
          </Button>
        )}

        {includeSearch && (
          <div className="flex gap-2 items-center">
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
        )}
      </div>

      {includeSearch && <SearchInput style="md:hidden relative w-full" />}
    </header>
  );
};

export default Header;
