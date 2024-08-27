import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

// Components
import SearchProductForm from ".";

const meta: Meta<typeof SearchProductForm> = {
  title: "Components/SearchProductForm",
  component: SearchProductForm,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchProductForm>;

export const Primary: Story = {};
