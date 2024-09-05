import type { Meta, StoryObj } from "@storybook/react";

// Components
import ProductListSkeleton from ".";

// Constants
import { HOME_LIMIT } from "@/constants";

const meta: Meta<typeof ProductListSkeleton> = {
  title: "Components/ProductListSkeleton",
  component: ProductListSkeleton,
  argTypes: {
    limit: {
      description: "The number of skeleton items to display",
    },
  },
  args: {
    limit: HOME_LIMIT,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductListSkeleton>;

export const Primary: Story = {};
