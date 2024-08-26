import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

// Components
import MutationProductForm from ".";

const meta: Meta<typeof MutationProductForm> = {
  title: "Components/MutationProductForm",
  component: MutationProductForm,
  argTypes: {
    data: {
      description: "The product data of the form",
    },
    isOpen: {
      description: "Whether the form is open or not",
    },
    onClose: {
      description: "Callback function to close the form",
    },
    onOpen: {
      description: "Callback function to open the form",
    },
    onOpenChange: {
      description: "Callback function to handle form opening/closing changes",
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof MutationProductForm>;

export const Primary: Story = {
  args: {
    isOpen: true,
    onOpen: () => {},
    onOpenChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>();

    const onClose = () => {
      updateArgs({ isOpen: false });
    };

    return <MutationProductForm {...args} onClose={onClose} />;
  },
};
