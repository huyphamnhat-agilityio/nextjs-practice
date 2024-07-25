import Link from "next/link";

import React from "react";

// Components
import NavBar from "../NavBar";
import { Button } from "@/themes";
import { HamburgerIcon, RightArrowIcon } from "../common";

// Constants
import { NAV_LIST } from "@/constants";

const Header = () => {
  return (
    <header className="max-w-6xl mx-auto my-0 flex justify-between px-2 2xl:px-0 2xl:pr-26 pt-4.5">
      <nav className="flex items-center gap-22">
        <Link href="/" className="text-foreground text-2xl font-bold">
          Brandname
        </Link>
        <NavBar navList={NAV_LIST} />
      </nav>

      <div className="flex gap-1">
        <Button
          color="primary"
          className="text-sm/5.5 font-bold"
          variant="light"
          size="md"
        >
          Login
        </Button>

        <Button
          color="primary"
          className="text-white text-sm/5.5 font-bold"
          size="md"
          endContent={<RightArrowIcon />}
        >
          JOIN US
        </Button>

        <Button
          isIconOnly
          size="tiny"
          variant="faded"
          className="bg-transparent border-none p-0"
        >
          <HamburgerIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
