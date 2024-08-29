import type { Meta, StoryObj } from "@storybook/react";

// Components
import { ErrorFallback } from "@/components";

const meta: Meta<typeof ErrorFallback> = {
  title: "Components/common/ErrorFallback",
  component: ErrorFallback,
  argTypes: {
    message: {
      description: "The error message to display",
    },
  },
  args: {},
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorFallback>;

export const Primary: Story = {};

export const WithMessage: Story = {
  args: {
    message: "Sample error message",
  },
};
