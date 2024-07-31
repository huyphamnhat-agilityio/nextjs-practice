import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Sections
import {
  FeedbackSection,
  GetQualitySection,
  HeroSection,
  PaymentSection,
  PopularCoursesSection,
  SponsorSection,
} from "@/containers";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  // const [isLightMode, setIsLightMode] = useState(true);
  // const { theme, setTheme } = useTheme();

  const currentPage = Number(searchParams?.page) || 1;

  // useEffect(() => {
  //   setTheme(isLightMode ? "light" : "dark");
  // }, [isLightMode, setTheme]);

  return (
    <main>
      <HeroSection />
      <GetQualitySection />
      <SponsorSection />
      <PopularCoursesSection currentPage={currentPage} />
      <PaymentSection />
      <FeedbackSection />
    </main>
  );
}
