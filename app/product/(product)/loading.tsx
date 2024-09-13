import { Spinner } from "@/components";

export default async function Loading() {
  return (
    <main>
      <div className="flex items-center justify-center h-[100vh]">
        <Spinner />
      </div>
    </main>
  );
}
