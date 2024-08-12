import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";

import { HERO_CARD_LIST } from "@/constants";

const HeroCardSkeleton = () => {
  return (
    <Card className="max-w-xs sm:max-w-82 px-10 py-8.75  flex flex-col gap-5 rounded-none">
      <CardHeader className="flex flex-col gap-5 items-start p-0">
        <Skeleton>
          <div
            className={`text-white flex justify-center items-center px-4.75 py-5.5 w-auto h-auto rounded-2.5 bg-${HERO_CARD_LIST[0].iconBackgroundColor}`}
          >
            {HERO_CARD_LIST[0].icon}
          </div>
        </Skeleton>
        <Skeleton>
          <h3 className="text-2xl font-bold text-foreground">
            {HERO_CARD_LIST[0].title}
          </h3>
        </Skeleton>
      </CardHeader>

      <Divider className="w-12.5 h-0.5 bg-primary" />

      <CardBody className="p-0">
        <Skeleton>
          <p className="text-sm text-foreground-100">
            {HERO_CARD_LIST[0].description}
          </p>
        </Skeleton>
      </CardBody>
    </Card>
  );
};

export default HeroCardSkeleton;
