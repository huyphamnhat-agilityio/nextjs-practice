import type { Meta, StoryObj } from "@storybook/react";

// Components
import HeroCard from ".";
import { BlackBoardIcon, MortarboardIcon, TelescopeIcon } from "../Icons";

const meta: Meta<typeof HeroCard> = {
  title: "Components/common/HeroCard",
  component: HeroCard,
  argTypes: {
    icon: {
      description: "Icon of the hero card",
      control: {
        disable: true,
      },
    },
    iconBackgroundColor: {
      description: "Background color of the icon button",
      control: {
        type: "select",
        options: ["primary", "secondary", "default"],
      },
    },
    title: {
      description: "Title of the hero card",
    },
    description: {
      description: "Description of the hero card",
    },
  },
  args: {
    icon: <BlackBoardIcon />,
    title: "Expert instruction",
    description:
      "The gradual accumulation of information about atomic and small-scale behaviour...",
    iconBackgroundColor: "primary",
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeroCard>;

export const Primary: Story = {};
