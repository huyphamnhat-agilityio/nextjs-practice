"use client";

// Components
import { Button, ErrorFallback } from "@/components";
import { NOT_FOUND_PAGE_MESSAGES } from "@/constants";

export default function NotFound() {
  return (
    <main>
      <div className="flex h-[20vh] lg:h-[70vh] flex-col gap-4 items-center justify-center">
        <ErrorFallback message={NOT_FOUND_PAGE_MESSAGES.HOME} />
      </div>
    </main>
  );
}
