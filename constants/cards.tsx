// Components
import { HeroCardProps } from "@/components/common/HeroCard";
import {
  BlackBoardIcon,
  MortarboardIcon,
  TelescopeIcon,
} from "@/components/common/Icons";

export const HERO_CARD_LIST: Array<HeroCardProps> = [
  {
    icon: <BlackBoardIcon />,
    iconBackgroundColor: "primary",
    title: "Expert instruction",
    description:
      "The gradual accumulation of information about atomic and small-scale behaviour...",
  },
  {
    icon: <TelescopeIcon />,
    iconBackgroundColor: "secondary",
    title: "Training Courses",
    description:
      "The gradual accumulation of information about atomic and small-scale behaviour...",
  },
  {
    icon: <MortarboardIcon />,
    iconBackgroundColor: "default",
    title: "Lifetime access",
    description:
      "The gradual accumulation of information about atomic and small-scale behaviour...",
  },
];
