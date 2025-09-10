import type { Meta, StoryObj } from "@storybook/nextjs";
import ProductCard from ".";
import { mockProduct } from "@/mocks";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ui/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],

  args: {
    product: mockProduct,
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {};
