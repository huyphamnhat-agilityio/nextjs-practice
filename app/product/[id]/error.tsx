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
    <main>
      <div className="flex h-[20vh] lg:h-[70vh] items-center justify-center">
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 pt-20 flex flex-col gap-20 w-full">
          <div className="flex gap-10 flex-col">
            <p className="text-danger text-center text-2xl font-bold">
              {error.message}
            </p>

            <Button
              onClick={() => reset()}
              className="text-white w-fit mx-auto"
            >
              Reset page
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
