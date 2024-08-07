import "@/styles/globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "./providers";

// components
import { Footer, Header } from "@/components";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Course App",
  description: "A simple course web app for schools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <div className="max-w-8xl mx-auto my-0 2xl:bg-hero-block bg-no-repeat">
            <Header />

            {children}

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
