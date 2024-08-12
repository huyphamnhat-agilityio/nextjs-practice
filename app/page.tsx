import dynamic from "next/dynamic";

import { PopularCoursesSection, SponsorSection } from "@/containers";

const HeroSection = dynamic(() =>
  import("@/containers").then((module) => module.HeroSection),
);

const GetQualitySection = dynamic(() =>
  import("@/containers").then((module) => module.GetQualitySection),
);

const PaymentSection = dynamic(() =>
  import("@/containers").then((module) => module.PaymentSection),
);

const FeedbackSection = dynamic(() =>
  import("@/containers").then((module) => module.FeedbackSection),
);

const SubscribeSection = dynamic(() =>
  import("@/containers").then((module) => module.SubscribeSection),
);
export default async function Home({
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
