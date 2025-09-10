import type { Meta, StoryObj } from "@storybook/nextjs";
import FilterSidebar, { FilterSidebarProps } from ".";

const meta: Meta<typeof FilterSidebar> = {
  title: "Components/ui/common/FilterSidebar",
  component: FilterSidebar,
  tags: ["autodocs"],
  args: {
    isDisabled: false,
  },
  argTypes: {
    isDisabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FilterSidebar>;

export const Default: Story = {
  args: {} satisfies FilterSidebarProps,
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
