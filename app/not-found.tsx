"use client";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components";

export default function NotFound({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <main className="flex h-[90vh] flex-col gap-2 items-center justify-center bg">
      <h2 className="text-center text-foreground">404 - Page Not Found</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => router.push("/")
        }
        className="text-white"
      >
        Back to home page
      </Button>
    </main>
  );
}
