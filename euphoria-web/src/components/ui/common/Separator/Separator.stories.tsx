import type { Meta, StoryObj } from "@storybook/nextjs";
import { Separator } from ".";

const meta: Meta<typeof Separator> = {
  title: "Components/ui/common/Separator",
  component: Separator,
  tags: ["autodocs"],

  args: {
    orientation: "horizontal",
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    className: "w-64",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-32",
  },
};
