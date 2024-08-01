import type { Meta, StoryObj } from "@storybook/react";

// Components
import ProductListSkeleton from ".";

const meta: Meta<typeof ProductListSkeleton> = {
  title: "Components/ProductListSkeleton",
  component: ProductListSkeleton,
  argTypes: {},
  args: {},
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductListSkeleton>;

export const Primary: Story = {};
