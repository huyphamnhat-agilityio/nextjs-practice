import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

// Components
import { ConfirmProductForm } from "..";

const meta: Meta<typeof ConfirmProductForm> = {
  title: "Components/ConfirmProductForm",
  component: ConfirmProductForm,
  argTypes: {
    id: {
      description: "Product ID",
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

type Story = StoryObj<typeof ConfirmProductForm>;

export const Primary: Story = {
  args: {
    isOpen: true,
    id: "0",
    onOpen: () => {},
    onOpenChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>();

    const onClose = () => {
      updateArgs({ isOpen: false });
    };

    return <ConfirmProductForm {...args} onClose={onClose} />;
  },
};
