"use client";
import Link from "next/link";

// Components
import { Button } from "@/components";

export default function NotFound() {
  return (
    <main>
      <div className="flex h-[20vh] lg:h-[70vh] flex-col gap-4 items-center justify-center">
        <h2 className="text-center text-foreground">404 - Page Not Found</h2>
        <Button as={Link} href="/" className="text-white">
          Back to home page
        </Button>
      </div>
    </main>
  );
}
