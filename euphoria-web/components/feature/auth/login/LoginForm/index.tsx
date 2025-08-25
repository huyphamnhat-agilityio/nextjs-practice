"use client";

import { useState, useCallback, useMemo, ChangeEvent, memo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { UserPayload } from "@/interfaces/user";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui/common";
import { clearErrorOnChange, isEnableSubmit } from "@/utils";
import { FORM_VALIDATION_MESSAGES, REGEX } from "@/constants";
import { login } from "@/actions";

const REQUIRED_FIELDS: (keyof UserPayload)[] = ["email", "password"];

const LOGIN_FORM_VALIDATION = {
  EMAIL: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Email"),
    pattern: {
      value: REGEX.EMAIL,
      message: FORM_VALIDATION_MESSAGES.INVALID("Email"),
    },
  },
  PASSWORD: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Password"),
    minLength: {
      value: 8,
      message: FORM_VALIDATION_MESSAGES.MIN_LENGTH("Password", 8),
    },
    maxLength: {
      value: 32,
      message: FORM_VALIDATION_MESSAGES.MAX_LENGTH("Password", 32),
    },
    pattern: {
      value: REGEX.ALL_WHITE_SPACE,
      message: FORM_VALIDATION_MESSAGES.ALL_WHITE_SPACE("Password"),
    },
  },
};

const LoginForm = memo(() => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<UserPayload>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, dirtyFields, isSubmitting },
  } = form;

  const onSubmit = useCallback(async () => {
    const errorMessage = await login(form.getValues());

    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  }, [form]);

  const handleInputChange = useCallback(
    (name: keyof UserPayload, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );

  const dirtyFieldList = Object.keys(dirtyFields);

  const isDisabled = useMemo(() => {
    return !isEnableSubmit({
      requiredFields: REQUIRED_FIELDS,
      dirtyFields: dirtyFieldList,
      errors,
    });
  }, [dirtyFieldList, errors]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* Email */}
        <FormField
          control={control}
          name="email"
          disabled={isSubmitting}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <FormItem>
              <FormLabel className="font-causten font-normal text-lg text-muted-foreground">
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  onChange={handleInputChange("email", onChange)}
                  className="h-12 text-base"
                  {...rest}
                />
              </FormControl>
              <FormDescription />
              {!!error?.message && <FormMessage>{error?.message}</FormMessage>}
            </FormItem>
          )}
          rules={LOGIN_FORM_VALIDATION.EMAIL}
        />

        {/* Password */}
        <FormField
          control={control}
          name="password"
          disabled={isSubmitting}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <FormItem>
              <FormLabel className="font-causten font-normal text-lg text-muted-foreground flex justify-between">
                Password
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  variant="icon"
                  size="auto"
                  className="font-causten font-normal text-lg text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange("password", onChange)}
                  className="h-12 text-base"
                  {...rest}
                />
              </FormControl>
              <FormDescription />
              {!!error?.message && <FormMessage>{error?.message}</FormMessage>}
            </FormItem>
          )}
          rules={LOGIN_FORM_VALIDATION.PASSWORD}
        />

        <Button
          type="submit"
          className="w-full text-base font-medium"
          size="lg"
          disabled={isDisabled || isSubmitting}
        >
          Sign In
        </Button>
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}
      </form>
    </Form>
  );
});

LoginForm.displayName = "LoginForm";
export default LoginForm;
