import type { Meta, StoryObj } from "@storybook/react";

// Components
import PaymentCard from ".";

const meta: Meta<typeof PaymentCard> = {
  title: "Components/common/PaymentCard",
  component: PaymentCard,
  argTypes: {
    isNew: {
      description: "Determines whether the payment card is new or not",
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

type Story = StoryObj<typeof PaymentCard>;

export const Primary: Story = {};

export const New: Story = {
  args: {
    isNew: true,
  },
};
