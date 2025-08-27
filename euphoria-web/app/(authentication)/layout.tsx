import { ReactNode } from "react";

// Components
import { Header } from "@/components/ui/common";

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
