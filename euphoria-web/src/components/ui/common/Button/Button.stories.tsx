import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "."; // adjust path
import { Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/ui/common/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    font: "causten",
    fontSize: "default",
    fontWeight: "normal",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "social",
        "icon",
        "image",
        "color",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon", "auto"],
    },
    font: {
      control: { type: "select" },
      options: ["causten", "coreSans"],
    },
    fontSize: {
      control: { type: "select" },
      options: ["default", "xs", "sm", "lg", "xl", "2xl", "3xl"],
    },
    fontWeight: {
      control: { type: "select" },
      options: ["light", "normal", "medium", "semibold", "bold"],
    },
    asChild: {
      control: "boolean",
    },
    className: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Default Button",
  },
};
export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive Button",
    variant: "destructive",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus />
        Add Item
      </>
    ),
    variant: "default",
  },
};
