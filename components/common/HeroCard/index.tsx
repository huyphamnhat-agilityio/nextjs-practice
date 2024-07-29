import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";

// Components
import { Button } from "../Button";

export type HeroCardProps = {
  icon: JSX.Element;
  iconBackgroundColor: "primary" | "secondary" | "default";
  title: string;
  description: string;
};
const HeroCard = ({
  icon,
  iconBackgroundColor,
  title,
  description,
}: HeroCardProps) => {
  return (
    <Card className="px-10 py-8.75 w-82 flex flex-col gap-5 rounded-none">
      <CardHeader className="flex flex-col gap-5 items-start p-0">
        <Button
          size="icon"
          isIconOnly
          className="text-white"
          color={iconBackgroundColor}
        >
          {icon}
        </Button>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
      </CardHeader>

      <Divider className="w-12.5 h-0.5 bg-primary" />

      <CardBody className="p-0">
        <p className="text-sm text-foreground-100">{description}</p>
      </CardBody>
    </Card>
  );
};

export default HeroCard;
