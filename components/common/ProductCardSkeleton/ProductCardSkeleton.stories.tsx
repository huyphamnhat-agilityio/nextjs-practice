import type { Meta, StoryObj } from "@storybook/react";

// Components
import ProductCardSkeleton from ".";

const meta: Meta<typeof ProductCardSkeleton> = {
  title: "Components/common/ProductCardSkeleton",
  component: ProductCardSkeleton,
};

export default meta;

type Story = StoryObj<typeof ProductCardSkeleton>;

export const Primary: Story = {};
