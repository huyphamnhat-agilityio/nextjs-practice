import { IMAGES, ROUTES } from "@/constants";
import Image from "next/image";
import React from "react";
import { Button } from "../common";
import Link from "next/link";

const NotFoundFallback = () => {
  return (
    <div className="flex flex-col items-center gap-3 max-w-xs sm:max-w-full">
      <Image
        src={IMAGES.NOT_FOUND}
        alt="Not found image"
        width={396}
        height={276}
        priority
        className="object-cover"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h4 className="font-core-sans-c font-bold text-4xl text-center">
            Oops<span className="font-sans">!</span> Page not found
          </h4>
          <p className="font-causten font-medium text-base text-alternative text-center">
            The page you are looking for might have been removed or temporarily
            unavailable.
          </p>
        </div>
        <Button
          font="causten"
          fontWeight="semibold"
          fontSize="lg"
          size="sm"
          className="px-12 max-w-[244px] mx-auto"
          asChild
        >
          <Link href={ROUTES.HOME}>Back to Shop</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundFallback;
