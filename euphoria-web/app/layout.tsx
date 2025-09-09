import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui";

// Local Fonts
const coreSansC = localFont({
  src: [
    {
      path: "../public/fonts/Core-Sans-C-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Core-Sans-C-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Core-Sans-C-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-core-sans-c",
  display: "swap",
});

const causten = localFont({
  src: [
    {
      path: "../public/fonts/Causten-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Causten-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Causten-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Causten-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Causten-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-causten",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Euphoria",
    default: "Shop",
  },
  description: "A simple e-commerce web app for clothing",
  metadataBase: new URL(process.env.HOST_URL ?? ""),
  openGraph: {
    title: {
      template: "%s - Euphoria",
      default: "Shop",
    },
    description: "A simple e-commerce web app for clothing",
    url: process.env.HOST_URL,
    type: "website",
    images: [
      {
        url: `${process.env.HOST_URL}/opengraph-image.jpg`,
        width: 695,
        height: 956,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s - Euphoria",
      default: "Shop",
    },
    description: "A simple e-commerce web app for clothing",
    images: [
      {
        url: `${process.env.HOST_URL}/twitter-image.jpg`,
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
    <html lang="en" className="">
      <body
        className={`${coreSansC.variable} ${causten.variable} overflow-y-scroll antialiased`}
        suppressHydrationWarning
      >
        <main className="mx-auto min-h-screen flex flex-col bg-background">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
