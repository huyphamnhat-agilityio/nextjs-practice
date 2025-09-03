import { NotFoundFallback } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex h-[20vh] lg:h-[70vh] flex-col gap-4 items-center justify-center">
      <NotFoundFallback />
    </div>
  );
}
