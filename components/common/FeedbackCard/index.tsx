import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

// Components
import { OutlinedStarIcon, SolidStarIcon } from "../Icons";

// Types
import { Avatar } from "@/types";

export type FeedbackCardProps = {
  avatar: Avatar;
};

export const FeedbackCard = ({ avatar }: FeedbackCardProps) => {
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
      <CardFooter className="p-0 flex gap-3.75 justify-center">
        <Image
          src={avatar.src}
          alt={avatar.alt}
          width={50}
          height={50}
          radius="full"
          className="object-cover"
        />
        <div className="flex flex-col">
          <h6 className="text-primary text-sm/6 font-bold">Regina Miles</h6>
          <small className="text-foreground text-xs">Designer</small>
        </div>
      </CardFooter>
    </Card>
  );
};
