import type { Meta, StoryObj } from "@storybook/react";

// Components
import { Pagination } from ".";

const meta: Meta<typeof Pagination> = {
  title: "Components/common/Pagination",
  component: Pagination,

  argTypes: {
    total: {
      description: "Total number of pages",
    },
    handlePageChange: {
      description: "Function to handle page change",
    },
  },
  args: {
    total: 10,
    handlePageChange: () => {},
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
