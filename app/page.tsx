"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Sections
import { HeroSection } from "@/containers";
import Image from "next/image";

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(isLightMode ? "light" : "dark");
  }, [isLightMode, setTheme]);
  return (
    <main>
      {/* <Button color="primary" variant="ghost" className="text-primary">
        XS
      </Button>
      <Button color="primary" size="sm" className="text-white">
        SM
      </Button>
      <Button color="primary" size="md" className="text-white">
        MD
      </Button>
      <Button color="primary" size="lg" className="text-white">
        LG
      </Button>
      <p className="text-foreground font-bold">TEXT</p>
      <p className="text-foreground-100 font-bold">TEXT</p>
      <p className="text-yellow-700">TEXT</p>
      <Button
        className="text-white"
        onClick={() => setIsLightMode((prev) => !prev)}
        color="olive"
      >
        Toggle
      </Button> */}
      <HeroSection />
    </main>
  );
}
