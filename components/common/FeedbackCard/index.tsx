import { Card, CardBody, CardFooter } from "@nextui-org/react";

// Components
import { OutlinedStarIcon, SolidStarIcon } from "../Icons";

export const FeedbackCard = () => {
  return (
    <Card className="p-6.25 max-w-87 border-none rounded-none" shadow="none">
      <CardBody className="flex flex-col gap-3.75 items-center p-7.5">
        <div className="flex gap-1.25 items-center">
          <SolidStarIcon />
          <SolidStarIcon />
          <SolidStarIcon />
          <SolidStarIcon />
          <OutlinedStarIcon />
        </div>
        <p className="text-foreground-100 text-sm text-center max-w-40">
          Slate helps you see how many more days you need to work to reach your
          financial goal for the month and year.
        </p>
      </CardBody>
      <CardFooter className="p-0">
        <div className="flex gap-3.75"></div>
      </CardFooter>
    </Card>
  );
};
