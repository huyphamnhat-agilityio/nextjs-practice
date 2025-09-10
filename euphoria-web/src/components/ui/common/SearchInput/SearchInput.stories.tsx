import type { Meta, StoryObj } from "@storybook/nextjs";
import SearchInput from ".";

const meta: Meta<typeof SearchInput> = {
  title: "Components/ui/common/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],

  args: {
    style: "relative w-64",
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};
