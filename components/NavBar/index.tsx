import React from "react";
import Link from "next/link";

// Types
import { NavItem } from "@/types";

import { Button } from "@/themes/components/Button";

export type NavigationProps = {
  navList: Array<NavItem>;
};
const NavBar = ({ navList }: NavigationProps) => {
  return (
    <div className="flex items-center justify-between">
      <ul className="flex items-center gap-5">
        {navList.map((navItem) => (
          <li key={navItem.id}>
            <Link
              href={navItem.destination}
              className="text-foreground-100 text-sm/6 font-bold hover:text-primary"
            >
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
