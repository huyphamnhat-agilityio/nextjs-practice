import type { Meta, StoryObj } from "@storybook/react";

// Components
import ProductCardSkeleton from ".";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks/product";

const meta: Meta<typeof ProductCardSkeleton> = {
  title: "Components/common/ProductCardSkeleton",
  component: ProductCardSkeleton,
  argTypes: {
    id: {
      description: "Product ID",
    },
    categoryId: {
      description: "Product category ID",
    },
    category: {
      description: "Product category",
    },
    description: {
      description: "Product description",
    },
    coverImageUrl: {
      description: "Product cover image URL",
    },
    originalPrice: {
      description: "Product original price",
    },
    salePrice: {
      description: "Product sale price",
    },
    rate: {
      description: "Product rating",
    },
    title: {
      description: "Product title",
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductCardSkeleton>;

export const Primary: Story = {
  args: { ...MOCK_PRODUCTS[0] },
};
