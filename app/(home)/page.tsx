import {
  FeedbackSection,
  GetQualitySection,
  HeroSection,
  PaymentSection,
  PopularCoursesSection,
  SponsorSection,
  SubscribeSection,
} from "@/containers";

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
