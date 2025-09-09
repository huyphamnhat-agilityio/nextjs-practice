import { Metadata } from "next";
// Components
import { LoginForm, LoginFormWrapper } from "@/components/feature/auth";

export const metadata: Metadata = {
  title: "Login",
  openGraph: {
    title: "Login",
  },
  twitter: {
    title: "Login",
  },
};

export default function LoginPage() {
  return (
    <LoginFormWrapper>
      <LoginForm />
    </LoginFormWrapper>
  );
}
