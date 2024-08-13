"use client";
import { Input } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

// Components
import { Button } from "@/components";

// Services
import { subscribe } from "@/lib";

// Types
import { FormState, Subscription } from "@/types";

// Constants
import { SUBSCRIBE_MESSAGES } from "@/constants";

const SubscribeForm = ({ state }: { state: FormState<Subscription> }) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Input
        name="email"
        placeholder="Your Email"
        classNames={{
          inputWrapper:
            "max-w-[80%] sm:max-w-172 self-center bg-foreground-200 py-3.75 px-4 !rounded-1.25 border border-foreground-300 h-auto relative",
          input: "text-foreground-100 text-sm/7 h-auto",
          errorMessage: "text-center text-md",
        }}
        endContent={
          <Button
            size="md"
            type="submit"
            className="hidden sm:block px-5.625 text-white text-sm/7 absolute right-0 rounded-l-none rounded-r-1.25"
            isDisabled={pending}
          >
            Subscribe
          </Button>
        }
        isInvalid={!!state.errors}
        errorMessage={state.errors?.email[0]}
        isDisabled={pending}
      />

      <Button
        size="md"
        type="submit"
        className="sm:hidden px-5.625 text-white text-sm/7 w-full max-w-[80%]"
        isDisabled={pending}
      >
        Subscribe
      </Button>
    </>
  );
};

const SubscribeSection = () => {
  const initialState: FormState<Subscription> = {};
  const [state, formAction, pending] = useFormState<
    FormState<Subscription>,
    FormData
  >(subscribe, initialState);

  useEffect(() => {
    if (state.message && !state.errors && state.resetKey) {
      toast.success(state.message);
    }

    if (state.message && !state.errors && !state.resetKey) {
      toast.error(state.message);
    }
  }, [state.errors, state.message, state.resetKey]);

  return (
    <section>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl mx-auto my-0 py-40 flex flex-col gap-20 justify-center">
        <div className="flex flex-col gap-2.5 text-center">
          <p className="text-primary text-sm/6 font-bold">Newsletter</p>
          <h3 className="text-foreground text-2xl font-bold">
            Most Popular Courses
          </h3>
          <p className="text-foreground-100 text-sm whitespace-pre-line">
            {`Problems trying to resolve the conflict between
            the two major realms of Classical physics: Newtonian mechanics`}
          </p>
        </div>
        <form
          action={formAction}
          key={state?.resetKey}
          className="flex flex-col gap-2 items-center"
        >
          <SubscribeForm state={state} />
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
