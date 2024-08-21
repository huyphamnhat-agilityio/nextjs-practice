"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
