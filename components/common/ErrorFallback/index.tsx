import Link from "next/link";

// Components
import { ErrorIcon } from "@/components";
import { DESTINATION } from "@/constants";

export type ErrorFallbackProps = {
  message?: string;
};

const ErrorFallback = ({ message = "" }: ErrorFallbackProps) => {
  return (
    <div className="flex flex-col items-center gap-6 max-w-xs sm:max-w-full">
      <ErrorIcon />
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
          <span className="text-danger">{message}</span>
        </p>
      )}

      <p className="text-foreground text-xl text-center">
        Please refresh the page or{" "}
        <Link href={DESTINATION.HOME} className="text-primary">
          back to home
        </Link>
      </p>
    </div>
  );
};

export default ErrorFallback;
