"use server";
import Image from "next/image";
import { Button } from "../Button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../NavigationMenu";
import { HamburgerMenuIcon } from "@/components/icons";
import { cookies } from "next/headers";
import { Search } from "lucide-react";
import { Input } from "../Input";

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
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
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
            <Button size="sm" variant="icon" className="md:hidden">
              <Search className="text-muted-foreground" />
            </Button>

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
      <div className="md:hidden relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
    </header>
  );
};

export default Header;
