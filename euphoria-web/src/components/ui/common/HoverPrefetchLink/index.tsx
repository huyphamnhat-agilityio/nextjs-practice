"use client";

import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useState } from "react";

const HoverPrefetchLink = ({
  href,
  children,
}: {
  href: Url;
  children: React.ReactNode;
}) => {
  const [active, setActive] = useState(false);

  return (
    <Link
      data-testid="hover-prefetch-link"
      data-prefetch={active}
      href={href}
      prefetch={active}
      onMouseEnter={() => setActive(true)}
    >
      {children}
    </Link>
  );
};

export default HoverPrefetchLink;
