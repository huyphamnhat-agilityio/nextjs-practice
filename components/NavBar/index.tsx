"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

// Components
import { Button } from "../common";

// Constants
import { NAV_LIST_DESKTOP, NAV_LIST_MOBILE } from "@/constants";
import { RightArrowIcon } from "../common/Icons";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent"
      isBlurred={false}
    >
      <NavbarContent>
        <div className="flex gap-11 lg:gap-22 items-center">
          <NavbarBrand as="div">
            <Link href="/" className="text-foreground text-2xl font-bold">
              Brandname
            </Link>
          </NavbarBrand>

          <NavbarContent className="hidden md:flex">
            {NAV_LIST_DESKTOP.map((item) => (
              <NavbarItem key={item.id}>
                <Link
                  href={item.destination}
                  className="text-foreground-100 text-sm/6 font-bold hover:text-primary"
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="primary"
            className="text-sm/5.5 font-bold hidden md:flex"
            variant="light"
            size="md"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            className="text-white text-sm/5.5 font-bold hidden md:flex"
            size="md"
            endContent={<RightArrowIcon />}
          >
            JOIN US
          </Button>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      </NavbarContent>
      <NavbarMenu className="pl-9">
        {NAV_LIST_MOBILE.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              href={item.destination}
              className="text-foreground-100 text-sm/6 font-bold hover:text-primary"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
