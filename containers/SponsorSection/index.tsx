// Components

import {
  AmazonLogo,
  HooliLogo,
  LyftLogo,
  PieldPiperLogo,
  RedditLogo,
  StripeLogo,
} from "@/components/common/Icons";

const SponsorSection = () => (
  <section>
    <div className="flex gap-7.5 flex-wrap max-w-5xl my-0 mx-auto mt-50 justify-evenly p-4 xl:p-0">
      <HooliLogo />
      <LyftLogo />
      <PieldPiperLogo />
      <StripeLogo />
      <AmazonLogo />
      <RedditLogo />
    </div>
  </section>
);

export default SponsorSection;
