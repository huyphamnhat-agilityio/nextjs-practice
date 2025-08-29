import { ReactNode } from "react";
import { cookies } from "next/headers";

// Components
import { Footer, Header } from "@/components/ui";

const Layout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const isAuthenticated = (await cookies()).has("accessToken");
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
