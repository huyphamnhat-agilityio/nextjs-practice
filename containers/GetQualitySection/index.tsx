import { Divider, Image, Link } from "@nextui-org/react";

// Components
import { NextArrowIcon } from "@/components/common/Icons";

const GetQualitySection = () => (
  <section className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0 max-w-5xl my-0 mx-auto mt-52">
    <div>
      <Image
        src="/girl-holding-pencil-image.svg"
        alt="An image of a girl holding a pencil"
      />
    </div>

    <div className="flex flex-col gap-8.75 w-95.25  ">
      <Divider className="w-23.5 h-1.75 bg-primary" />
      <h2 className="text-foreground text-5xl/12.5 font-bold">
        Get Quality Education
      </h2>
      <p className="text-foreground-100 text-sm">
        Problems trying to resolve the conflict between
        <br />
        the two major realms of Classical physics:
        <br />
        Newtonian mechanics
      </p>
      <Link
        href="/"
        color="primary"
        className="flex gap-2.5 text-sm/6 font-bold"
      >
        Learn More
        <NextArrowIcon />
      </Link>
    </div>
  </section>
);

export default GetQualitySection;
