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

const Header = async () => {
  const isAuthenticated = (await cookies()).has("accessToken");
  return (
    <header className="flex items-center justify-between p-4 md:p-6 border-b-1 border-b-border">
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
    </header>
  );
};

export default Header;
