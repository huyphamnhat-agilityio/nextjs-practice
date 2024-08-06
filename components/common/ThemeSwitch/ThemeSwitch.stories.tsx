import type { Meta, StoryObj } from "@storybook/react";

// Components
import ThemeSwitch from ".";

const meta: Meta<typeof ThemeSwitch> = {
  title: "Components/common/ThemeSwitch",
  component: ThemeSwitch,
  argTypes: {
    className: {
      description: "Additional class name for the theme switch",
    },
  },
  args: {
    className: "",
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeSwitch>;

export const Primary: Story = {};
