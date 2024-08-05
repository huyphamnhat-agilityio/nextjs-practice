import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

// Components
import { OutlinedStarIcon, SolidStarIcon } from "../Icons";

// Types
import { Avatar, User } from "@/types";

export type FeedbackCardProps = {
  avatar: Avatar;
  rate: number;
  comment: string;
  user: User;
};

export const FeedbackCard = ({
  avatar,
  rate,
  comment,
  user,
}: FeedbackCardProps) => {
  return (
    <Card className="p-6.25 max-w-87 border-none rounded-none" shadow="none">
      <CardBody className="flex flex-col gap-3.75 items-center p-7.5">
        <div className="flex gap-1.25 items-center">
          {new Array(5)
            .fill(5)
            .map((_, index) =>
              index + 1 <= rate ? (
                <SolidStarIcon key={index} />
              ) : (
                <OutlinedStarIcon key={index} />
              ),
            )}
        </div>
        <p className="text-foreground-100 text-sm text-center max-w-40">
          {comment}
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
          loading="lazy"
        />
        <div className="flex flex-col">
          <p className="text-primary text-sm/6 font-bold">{user.name}</p>
          <small className="text-foreground text-xs">{user.role}</small>
        </div>
      </CardFooter>
    </Card>
  );
};
