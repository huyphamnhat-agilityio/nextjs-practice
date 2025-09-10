import type { Meta, StoryObj } from "@storybook/nextjs";
import NotFoundFallback from ".";

const meta: Meta<typeof NotFoundFallback> = {
  title: "Components/ui/NotFoundFallback",
  component: NotFoundFallback,
  tags: ["autodocs"],
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof NotFoundFallback>;

export const Default: Story = {};
