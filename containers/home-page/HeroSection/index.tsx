import Image from "next/image";
import Link from "next/link";

// Components
import { Button, HeroCard } from "@/components";
// Constants
import { HERO_CARD_LIST, IMAGES } from "@/constants";

const HeroSection = () => (
  <section>
    <div className="relative">
      <Image
        src={IMAGES.HERO_BACKGROUND_THUMBNAIL.src}
        alt={IMAGES.HERO_BACKGROUND_THUMBNAIL.alt}
        className="hidden 2xl:block absolute top-0 right-10"
        width={625}
        height={721}
        priority
      />
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 mx-auto pt-26 flex flex-col gap-20">
        <div className="max-w-xs md:max-w-xl flex flex-col gap-8.75 mx-auto text-center mobile:px-4 2xl:px-0 2xl:text-left 2xl:mx-0">
          <h5 className="text-base font-bold text-primary">
            For Better Future
          </h5>
          <h1 className="text-6xl/20 font-bold uppercase text-foreground">
            High Quality Course
          </h1>
          <p className="text-xl/7.5 text-foreground-100 max-w-84.5 mx-auto my-0 2xl:m-0 2xl:max-w-84.5 font-normal">
            Every day brings with it a fresh set of learning possibilities.
          </p>
          <div className="flex gap-2.5 justify-center 2xl:justify-start flex-wrap">
            <Button
              size="lg"
              as={Link}
              href="#"
              aria-label="Go to get quote page"
              className="text-white w-full sm:w-fit "
            >
              Get Quote Now
            </Button>
            <Button
              size="lg"
              as={Link}
              href="#"
              aria-label="Go to learn more page"
              variant="bordered"
              className="w-full sm:w-fit"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-7.5 justify-center">
          {HERO_CARD_LIST.map((card, index) => (
            <HeroCard
              key={index}
              icon={card.icon}
              iconBackgroundColor={card.iconBackgroundColor}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
