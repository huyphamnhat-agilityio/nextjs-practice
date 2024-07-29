"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Sections
import { GetQualitySection, HeroSection, SponsorSection } from "@/containers";

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(isLightMode ? "light" : "dark");
  }, [isLightMode, setTheme]);
  return (
    <main>
      <HeroSection />
      <GetQualitySection />
      <SponsorSection />
    </main>
  );
}
