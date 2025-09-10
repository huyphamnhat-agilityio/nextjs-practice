import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tooltip, TooltipTrigger, TooltipContent } from ".";

const meta: Meta<typeof Tooltip> = {
  title: "Components/ui/common/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Tooltip>;
export default meta;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>Tooltip text</TooltipContent>
    </Tooltip>
  ),
};
