import type { Meta, StoryObj } from "@storybook/react";

// Components
import NavBar from ".";

const meta: Meta<typeof NavBar> = {
  title: "Components/NavBar",
  component: NavBar,
  argTypes: {},
  args: {},
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Primary: Story = {};
