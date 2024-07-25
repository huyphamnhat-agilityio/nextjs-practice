import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="h-screen relative">
      <Image
        src="/hero-background-children.svg"
        alt="Hero background children image"
        className="hidden 2xl:block absolute top-0 right-10"
        width={625}
        height={721}
      />
    </section>
  );
};

export default HeroSection;
