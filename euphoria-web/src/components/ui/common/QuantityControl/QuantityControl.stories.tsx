import type { Meta, StoryObj } from "@storybook/nextjs";
import QuantityControl, { QuantityControlProps } from ".";
import { useState } from "react";

const meta: Meta<typeof QuantityControl> = {
  title: "Components/ui/common/QuantityControl",
  component: QuantityControl,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuantityControl>;

const Template = (args: QuantityControlProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-2">
      <QuantityControl
        {...args}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
};

export const Disabled: Story = {
  render: (args) => <Template {...args} isDisabled />,
};
