import type { Meta, StoryObj } from "@storybook/react";

// Components
import PlanCard from ".";

// Mock
import { MOCK_PLAN } from "@/mocks/plan";

const meta: Meta<typeof PlanCard> = {
  title: "Components/common/PlanCard",
  component: PlanCard,
  argTypes: {
    isNew: {
      description: "Determines whether the payment card is new or not",
    },
    description: {
      description: "Description of the payment card",
    },
    duration: {
      description: "Duration of the payment card",
    },
    features: {
      description: "Features of the payment card",
    },
    price: {
      description: "Price of the payment card",
    },
    subTitle: {
      description: "Subtitle of the payment card",
    },
    title: {
      description: "Title of the payment card",
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

type Story = StoryObj<typeof PlanCard>;

export const Primary: Story = {
  args: {
    ...MOCK_PLAN,
  },
};

export const New: Story = {
  args: {
    ...MOCK_PLAN,
    isNew: true,
  },
};
