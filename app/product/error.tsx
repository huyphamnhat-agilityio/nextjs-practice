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
      <div className="flex justify-center">
        <ErrorFallback message={error.message} />
      </div>
    </main>
  );
}
