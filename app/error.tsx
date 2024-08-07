"use client";
// Components
import { Button } from "@/components";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-[90vh] flex-col gap-2 items-center justify-center bg">
      <h2 className="text-center text-foreground">Something went wrong</h2>
      <Button onClick={() => reset()} className="text-white">
        Go back
      </Button>
    </main>
  );
}
