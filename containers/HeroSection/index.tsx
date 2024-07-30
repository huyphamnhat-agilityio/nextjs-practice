import Image from "next/image";

// Components
import { Button, HeroCard } from "@/components";
// Constants
import { HERO_CARD_LIST } from "@/constants";

const HeroSection = () => (
  <section>
    <div className="relative">
      <Image
        src="/hero-background-children.svg"
        alt="An image of a child holding notebooks"
        className="hidden 2xl:block absolute top-0 right-10"
        width={625}
        height={721}
        priority
      />
      <div className="max-w-5xl my-0 mx-auto pt-26 flex flex-col gap-20">
        <div className="max-w-xl flex flex-col gap-8.75 mx-auto text-center px-4 2xl:px-0 2xl:text-left 2xl:mx-0">
          <h5 className="max text-base font-bold text-primary">
            For Better Future
          </h5>
          <h1 className="text-6xl/20 font-bold uppercase text-foreground">
            High Quality Course
          </h1>
          <p className="text-xl/7.5 text-foreground-100 max-w-84.5 mx-auto my-0 2xl:m-0 2xl:max-w-84.5 font-normal">
            Every day brings with it a fresh set of learning possibilities.
          </p>
          <div className="flex gap-2.5 justify-center 2xl:justify-start flex-wrap">
            <Button size="lg" className="text-white">
              Get Quote Now
            </Button>
            <Button size="lg" variant="bordered">
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
