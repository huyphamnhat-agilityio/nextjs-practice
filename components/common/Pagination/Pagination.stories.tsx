import type { Meta, StoryObj } from "@storybook/react";

// Components
import { Pagination } from ".";

const meta: Meta<typeof Pagination> = {
  title: "Components/common/Pagination",
  component: Pagination,
  decorators: [
    (Story) => (
      <div className="bg-dark-blue rounded-full px-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    total: {
      description: "Total number of pages",
    },
  },
  args: {
    total: 10,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {};
