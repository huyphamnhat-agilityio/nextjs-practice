import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "../providers";

// components
import { Footer, Header } from "@/components";

// Constants
import { TOAST_COLORS } from "@/constants";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Course App",
  description: "A simple course web app for schools",
  metadataBase: new URL("https://nextjs-practice-eosin-beta.vercel.app/"),
  openGraph: {
    title: "School Course App",
    description: "A simple course web app for schools",
    url: "https://nextjs-practice-eosin-beta.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://nextjs-practice-eosin-beta.vercel.app/opengraph-image.jpg",
        width: 1953,
        height: 2253,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School Course App",
    description: "A simple course web app for schools",
    images: [
      {
        url: "https://nextjs-practice-eosin-beta.vercel.app/twitter-image.jpg",
        width: 1953,
        height: 2253,
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Providers>
          <div className="max-w-8xl mx-auto my-0 2xl:bg-mini-hero-block bg-no-repeat">
            <Header />

            <Toaster
              position="bottom-center"
              toastOptions={{
                success: {
                  style: {
                    background: TOAST_COLORS.SUCCESS,
                  },
                },
                error: {
                  style: {
                    background: TOAST_COLORS.ERROR,
                  },
                },
                style: {
                  color: "white",
                },
              }}
            />

            {children}

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
