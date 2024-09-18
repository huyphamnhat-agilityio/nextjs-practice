import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

// Components
import { CheckMarkIcon, HeartIcon } from "../Icons";
import { Button } from "../Button";
import { MOCK_PLAN } from "@/mocks/plan";

export type PlanCardProps = {
  isNew?: boolean;
  title: string;
  subTitle: string;
  description: string;
  price: number;
  duration: "day" | "month" | "year";
  features: Array<{
    isSupported: boolean;
    feature: string;
  }>;
};

const PlanCard = ({
  isNew,
  title,
  subTitle,
  price,
  duration,
  description,
  features,
}: PlanCardProps) => (
  <Card className="max-w-82 px-10 py-12.5 rounded-none flex flex-col gap-8.75 relative overflow-visible">
    {isNew && (
      <div className="rounded-full bg-dull-orange px-4 py-7 text-white text-2xl font-bold absolute -top-8 -right-8 z-10">
        New
      </div>
    )}
    <CardHeader className="p-0 flex flex-col gap-8.75 text-start items-start">
      <div className="bg-primary p-6 rounded-full">
        <HeartIcon />
      </div>
      <h3 className="uppercase text-foreground text-2xl font-bold">{title}</h3>
    </CardHeader>
    <CardBody className="flex flex-col gap-8.75 p-0 text-start items-start">
      <p className="text-foreground-100 text-sm/6 font-bold pr-2">{subTitle}</p>

      <div className="flex flex-col items-center">
        <p className="text-primary text-5xl/12.5 font-bold">{price}$</p>
        <p className="text-secondary-50 text-sm/6 font-bold">
          Per <span className="capitalize">{duration}</span>
        </p>
      </div>

      <p className="text-foreground-100 text-sm">{description}</p>

      <Button size="lg" className="text-white text-sm/5.5 font-bold w-full">
        Try for free
      </Button>
    </CardBody>
    <CardFooter className="flex flex-col items-start gap-3.75 p-0">
      {features.map(
        (
          {
            feature = MOCK_PLAN.features[0].feature,
            isSupported = MOCK_PLAN.features[0].isSupported,
          },
          index,
        ) => (
          <div key={index} className="flex items-center gap-2.5">
            <div
              className={`rounded-full bg-${isSupported ? "success" : "foreground-50"} px-2 py-2.5`}
            >
              <CheckMarkIcon />
            </div>
            <p className="text-foreground text-sm/6 font-bold">{feature}</p>
          </div>
        ),
      )}
    </CardFooter>
  </Card>
);

export default PlanCard;
