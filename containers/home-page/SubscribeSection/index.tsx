"use client";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Button, Input } from "@/components";

// Services
import { subscribe } from "@/lib";

// Types
import { FormState, Subscription, SubscriptionForm } from "@/types";

// Constants
import { FORM_STATUS } from "@/constants";

// Schemas
import { SubscribeSchema } from "@/schemas";

export type SubscribeFormProps = {
  state: FormState<Subscription>;
  control: Control<SubscriptionForm, any>;
  isValid: boolean;
  errors: FieldErrors<SubscriptionForm>;
};
const SubscribeForm = ({
  state,
  control,
  isValid,
  errors,
}: SubscribeFormProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
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
                  isDisabled={!isValid || pending}
                  data-testid="subscribe-button"
                >
                  Subscribe
                </Button>
              }
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={!!errors?.email || !!state?.errors?.email.length}
              errorMessage={errors?.email?.message}
              isDisabled={pending}
            />

            {state?.errors?.email &&
              state?.errors?.email?.length > 0 &&
              state.errors.email.map((error, index) => (
                <p key={index} className="text-md text-danger text-center">
                  {error}
                </p>
              ))}
          </>
        )}
      />

      <Button
        size="md"
        type="submit"
        className="sm:hidden px-5.625 text-white text-sm/7 w-full max-w-[80%]"
        isDisabled={!isValid || pending}
      >
        Subscribe
      </Button>
    </>
  );
};

const SubscribeSection = () => {
  const initialState: FormState<Subscription> = {};

  const [state, formAction] = useFormState<FormState<Subscription>, FormData>(
    subscribe,
    initialState,
  );

  const {
    control,
    formState: { isValid, errors },
    reset,
  } = useForm<SubscriptionForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(SubscribeSchema),
  });

  useEffect(() => {
    if (state?.message && state?.status === FORM_STATUS.SUCCESS) {
      toast.success(state?.message);

      reset();
    }
  }, [reset, state.message, state?.status]);

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
        <form action={formAction} className="flex flex-col gap-2 items-center">
          <SubscribeForm
            control={control}
            errors={errors}
            isValid={isValid}
            state={state}
          />
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
