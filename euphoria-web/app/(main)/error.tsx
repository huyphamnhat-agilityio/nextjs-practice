"use client";

import { ErrorFallback } from "@/components/ui";

// Components

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex justify-center">
      <ErrorFallback message={error.message} />
    </div>
  );
}
