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
  SubscribeSection,
} from "@/containers";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main>
      <HeroSection />
      <GetQualitySection />
      <SponsorSection />
      <PopularCoursesSection currentPage={currentPage} />
      <PaymentSection />
      <FeedbackSection />
      <SubscribeSection />
    </main>
  );
}
