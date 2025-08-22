"use client";
import { ChangeEvent, useCallback, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { GoogleIcon, TwitterIcon } from "@/components/icons";
import { useForm } from "react-hook-form";
import { UserPayload } from "@/interfaces";
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
  Separator,
} from "@/components/ui";
import { clearErrorOnChange } from "@/utils";
import { FORM_VALIDATION_MESSAGES, REGEX } from "@/constants";

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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const form = useForm<UserPayload>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, dirtyFields, isSubmitting },
  } = form;

  const onSubmit = (data: UserPayload) => {
    console.log("Login attempt:", data);
  };

  const handleInputChange = useCallback(
    (name: keyof UserPayload, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);

        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors]
  );

  return (
    <div className="mx-auto  min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 border-b-1 border-b-border">
        <div className="flex items-center">
          <Image
            src="/images/logo.jpg"
            alt="Euphoria"
            width={92}
            height={45}
            objectFit="contain"
            className="hover:cursor-pointer"
          />
        </div>
        <Button variant="default" size="sm" fontSize="lg" className="px-12">
          Login
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden min-h-[400px]">
          <Image
            src="/images/hero-image.jpg"
            alt="Happy friends"
            fill
            objectFit="cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h1 className="font-core-sans-c font-bold text-left text-4xl text-foreground">
                Sign In Page
              </h1>
            </div>

            <div className="space-y-4">
              {/* Social Login Buttons */}
              <Button
                variant="social"
                size="lg"
                className="text-base font-normal"
              >
                <GoogleIcon />
                Continue With Google
              </Button>

              <Button
                variant="social"
                size="lg"
                className="text-base font-normal"
              >
                <TwitterIcon />
                Continue With Twitter
              </Button>

              {/* Divider */}
              <div className="flex items-center space-x-4">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>

              {/* Login Form */}
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormField
                    control={control}
                    name="email"
                    render={({
                      field: { onChange, ...rest },
                      fieldState: { error },
                    }) => (
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
                        {!!error?.message && (
                          <FormMessage>{error?.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                    rules={LOGIN_FORM_VALIDATION.EMAIL}
                  />

                  <FormField
                    control={control}
                    name="password"
                    render={({
                      field: { onChange, ...rest },
                      fieldState: { error },
                    }) => (
                      <FormItem>
                        <FormLabel className="font-causten font-normal text-lg text-muted-foreground flex justify-between">
                          Password
                          <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            variant="icon"
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
                        {!!error?.message && (
                          <FormMessage>{error?.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                    rules={LOGIN_FORM_VALIDATION.PASSWORD}
                  />

                  <Button
                    type="submit"
                    className="w-full text-base font-medium"
                    size="lg"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>
              {/* <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 flex flex-col">
                  <label
                    htmlFor="email"
                    className="font-causten font-normal text-lg text-muted-foreground"
                  >
                    User name or email address
                  </label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="font-causten font-normal text-lg text-muted-foreground"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="font-causten font-normal text-lg text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full text-base font-medium"
                  size="lg"
                >
                  Sign In
                </Button>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
