import type { Meta, StoryObj } from "@storybook/nextjs";
import { Skeleton } from ".";

const meta: Meta<typeof Skeleton> = {
  title: "Components/ui/common/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: {
    className: "w-24 h-6",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Circle: Story = {
  args: {
    className: "w-12 h-12 rounded-full",
  },
};

export const TextLine: Story = {
  args: {
    className: "w-48 h-4",
  },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="space-y-2 w-64 p-4 border rounded-md">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};
