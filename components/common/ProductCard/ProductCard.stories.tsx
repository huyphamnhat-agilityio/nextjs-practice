import type { Meta, StoryObj } from "@storybook/react";

// Components
import ProductCard from ".";
import { MOCK_PRODUCTS } from "@/mocks/product";

const meta: Meta<typeof ProductCard> = {
  title: "Components/common/ProductCard",
  component: ProductCard,
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

type Story = StoryObj<typeof ProductCard>;

export const Primary: Story = {
  args: { id: "1", ...MOCK_PRODUCTS[0] },
};
