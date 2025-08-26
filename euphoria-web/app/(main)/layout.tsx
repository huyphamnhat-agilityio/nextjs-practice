import { Footer, Header } from "@/components/ui";
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
      <Footer />
    </>
  );
};

export default Layout;
