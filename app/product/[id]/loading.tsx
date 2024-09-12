import { Skeleton } from "@nextui-org/react";

export default async function Loading() {
  return (
    <main>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl min-h-[66vh] my-0 pt-20 flex flex-col gap-15 mx-auto">
        <div className="flex flex-col gap-10">
          <Skeleton className="h-10" />

          <Skeleton className="h-8" />
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between gap-4 lg:gap-0">
          <div className="flex flex-col gap-15">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-11" />

              <Skeleton className="h-11" />

              <Skeleton className="h-11" />

              <Skeleton className="h-11" />
            </div>

            <Skeleton className="h-42 w-full lg:w-85" />
          </div>

          <div className="flex flex-col gap-6 items-center justify-between">
            <Skeleton className="h-90 w-80 sm:w-120" />

            <Skeleton className="w-full h-13" />
          </div>
        </div>
      </div>
    </main>
  );
}
