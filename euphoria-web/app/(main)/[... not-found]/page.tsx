"use client";

import { ERROR_MESSAGES } from "@/constants";

// Components
import { ErrorFallback } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex h-fit lg:h-[70vh] flex-col gap-4 items-center justify-center">
      <ErrorFallback message={ERROR_MESSAGES.PAGE_NOT_FOUND} />
    </div>
  );
}
