import type { Meta, StoryObj } from "@storybook/nextjs";
import ProductCardSkeleton from ".";

const meta: Meta<typeof ProductCardSkeleton> = {
  title: "Components/ui/ProductCardSkeleton",
  component: ProductCardSkeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductCardSkeleton>;

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <ProductCardSkeleton />
    </div>
  ),
};
