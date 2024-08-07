import { PlanCard } from "@/components";
import { MOCK_PLAN } from "@/mocks/plan";
import React from "react";

const PaymentSection = () => (
  <section>
    <div className="flex justify-center overflow-hidden">
      <div className="flex flex-col gap-20 py-40 max-w-xs lg:max-w-4xl xl:max-w-5xl my-0">
        <div className="flex flex-col gap-2.5 items-center text-center 2xl:text-start 2xl:items-start">
          <p className="text-primary text-sm/6 font-bold">Practice Advice</p>
          <h3 className="text-foreground text-2xl font-bold">
            Watch our Courses
          </h3>
          <p className="text-foreground-100 text-sm">
            Problems trying to resolve the conflict between
            <br />
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10 2xl:gap-8">
          <PlanCard {...MOCK_PLAN} />
          <PlanCard {...MOCK_PLAN} isNew />
          <PlanCard {...MOCK_PLAN} />
        </div>
      </div>
    </div>
  </section>
);

export default PaymentSection;
