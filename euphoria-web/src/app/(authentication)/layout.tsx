import { ReactNode } from "react";

// Layout
import { Header } from "@/layouts";

const Layout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
