import type { Meta, StoryObj } from "@storybook/react";

// Components
import { FeedbackCard } from ".";

// Mocks
import { MOCK_AVATARS } from "@/mocks/avatar";

const meta: Meta<typeof FeedbackCard> = {
  title: "Components/common/FeedbackCard",
  component: FeedbackCard,
  argTypes: {
    avatar: {
      description: "The avatar of the feedback card",
    },
    comment: {
      description: "The comment of the feedback card",
    },
    rate: {
      description: "The rate of the feedback card",
    },
    user: {
      description: "The user of the feedback card",
    },
  },
  args: {
    avatar: MOCK_AVATARS[0],
    comment:
      "Slate helps you see how many more days you need to work to reach your financial goal for the month and year.",
    rate: 3,
    user: {
      id: "1",
      name: "Regina Miles",
      role: "Designer",
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof FeedbackCard>;

export const Primary: Story = {};
