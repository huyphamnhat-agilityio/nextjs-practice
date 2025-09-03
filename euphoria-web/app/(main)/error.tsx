"use client";

// Components
import { ErrorFallback } from "@/components/ui";

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
