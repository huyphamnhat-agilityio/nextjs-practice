import { IMAGES, ROUTES } from "@/constants";
import Image from "next/image";
import Link from "next/link";

// Components

export type ErrorFallbackProps = {
  message?: string;
};

const ErrorFallback = ({ message = "" }: ErrorFallbackProps) => {
  return (
    <div className="flex flex-col items-center gap-6 max-w-xs sm:max-w-full">
      <Image
        src={IMAGES.ERROR}
        width={200}
        height={200}
        alt="Error image"
        className=" object-cover"
        priority
      />
      <h4 className="text-foreground text-4xl text-center">
        Oops! There is something wrong
      </h4>
      <p className="text-foreground-100 text-xl text-center whitespace-pre-line">
        {`An error occurred. For more help, feel free 
        to reach out to our support team.`}
      </p>
      {message && (
        <p className="text-foreground-100 text-lg text-center whitespace-pre-line">
          Detail error:
          <br />
          <span className="text-destructive">{message}</span>
        </p>
      )}
      <p className="text-foreground text-xl text-center">
        Please refresh the page or{" "}
        <Link href={ROUTES.HOME} prefetch={false} className="text-primary">
          back to home
        </Link>
      </p>
    </div>
  );
};

export default ErrorFallback;
