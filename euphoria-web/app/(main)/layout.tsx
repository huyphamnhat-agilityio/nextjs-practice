import { Header } from "@/components/ui/common";
import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header includeSearch />
      {children}
    </>
  );
};

export default Layout;
