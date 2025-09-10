import type { Meta, StoryObj } from "@storybook/nextjs";
import ErrorFallback from ".";

const meta: Meta<typeof ErrorFallback> = {
  title: "Components/ui/ErrorFallback",
  component: ErrorFallback,
  tags: ["autodocs"],
  parameters: {},
  args: {
    message: "",
  },
};

export default meta;
type Story = StoryObj<typeof ErrorFallback>;

export const Default: Story = {};

export const WithCustomMessage: Story = {
  args: {
    message: "Something went wrong while fetching data.",
  },
};
