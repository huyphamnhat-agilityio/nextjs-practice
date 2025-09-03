import { ErrorFallback } from "@/components/ui";
import { ERROR_MESSAGES } from "@/constants";

export default function NotFound() {
  return (
    <div className="flex h-[20vh] lg:h-[70vh] flex-col gap-4 items-center justify-center">
      <ErrorFallback message={ERROR_MESSAGES.PRODUCT_NOT_FOUND} />
    </div>
  );
}
