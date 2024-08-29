"use client";
// Components
import { Button } from "@/components";

// Sections
import {
  FeedbackSection,
  GetQualitySection,
  HeroSection,
  PaymentSection,
  SponsorSection,
  SubscribeSection,
} from "@/containers";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <HeroSection />
      <GetQualitySection />
      <SponsorSection />
      <section>
        <div className="bg-dark-blue mt-32.5 flex justify-center">
          <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 py-40 flex flex-col gap-20">
            <div className="flex flex-col gap-2.5 text-center 2xl:text-start">
              <h3 className="text-primary text-sm/6 font-bold">
                Practice Advice
              </h3>
              <h3 className="text-white text-5xl/12.5 font-bold">
                Our Popular Courses
              </h3>
              <p className="text-white text-sm whitespace-pre-line">
                {`Problems trying to resolve the conflict between
                the two major realms of Classical physics: Newtonian mechanics`}
              </p>
            </div>

            <p className="text-danger text-center text-2xl font-bold max-w-[1004px]">
              {error.message}
            </p>

            <Button
              onClick={() => reset()}
              className="text-white w-fit mx-auto"
            >
              Reset page
            </Button>
          </div>
        </div>
      </section>
      <PaymentSection />
      <FeedbackSection />
      <SubscribeSection />
    </>
  );
}
