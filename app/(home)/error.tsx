"use client";
// Components
import { ErrorFallback } from "@/components";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <div className="flex h-fit lg:h-[70vh] flex-col gap-4 items-center justify-center">
        <ErrorFallback message={error.message} />
      </div>
    </main>
  );
}
