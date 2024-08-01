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
  },
  args: {
    avatar: MOCK_AVATARS[0],
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
