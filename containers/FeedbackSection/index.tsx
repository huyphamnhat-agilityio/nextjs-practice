// Components
import { FeedbackCard } from "@/components";

const FeedbackSection = () => {
  return (
    <section>
      <div className="max-w-lg md:max-w-4xl lg:max-w-5xl my-0 mx-auto py-40 flex flex-col gap-20">
        <div className="flex flex-col gap-2.5 text-center 2xl:text-start">
          <h6 className="text-primary text-sm/6 font-bold">Practice Advice</h6>
          <h2 className="text-foreground text-5xl/12.5 font-bold">
            Approdable Packages
          </h2>
          <p className="text-foreground-100 text-sm">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>
        <div className="flex flex-wrap gap-7.5">
          <FeedbackCard />
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
