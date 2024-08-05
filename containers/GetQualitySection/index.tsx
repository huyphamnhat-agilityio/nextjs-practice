import { Divider, Link } from "@nextui-org/react";
import Image from "next/image";

// Components
import { NextArrowIcon } from "@/components/common/Icons";

// Constants
import { IMAGES } from "@/constants";

const GetQualitySection = () => (
  <section>
    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 2xl:gap-0 max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 mx-auto mt-52">
      <div>
        <Image
          src={IMAGES.GET_QUALITY_SECTION_THUMBNAIL.src}
          alt={IMAGES.GET_QUALITY_SECTION_THUMBNAIL.alt}
          width={458}
          height={535}
        />
      </div>

      <div className="flex flex-col gap-8.75 sm:w-95.25 text-center lg:text-start items-center lg:items-start">
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
    </div>
  </section>
);

export default GetQualitySection;
