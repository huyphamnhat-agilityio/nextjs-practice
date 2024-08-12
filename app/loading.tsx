import {
  FeedbackSection,
  GetQualitySection,
  HeroSection,
  PaymentSection,
  PopularCoursesSection,
  SponsorSection,
  SubscribeSection,
} from "@/containers";

export default function Loading() {
  return (
    <main>
      <HeroSection />
      <GetQualitySection />
      <SponsorSection />
      <PopularCoursesSection currentPage={1} />
      <PaymentSection />
      <FeedbackSection />
      <SubscribeSection />
    </main>
  );
}
