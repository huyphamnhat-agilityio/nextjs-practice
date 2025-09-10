import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from ".";

const meta: Meta<typeof Badge> = {
  title: "Components/ui/common/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
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
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "1",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "2",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "3",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "4",
    variant: "outline",
  },
};
