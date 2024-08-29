"use client";
// Components
import { Button, ErrorFallback } from "@/components";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <div className="flex h-[20vh] lg:h-[70vh] items-center justify-center">
        <ErrorFallback message={error.message} />
      </div>
    </main>
  );
}
