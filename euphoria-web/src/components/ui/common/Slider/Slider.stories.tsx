import type { Meta, StoryObj } from "@storybook/nextjs";
import { Slider } from ".";
import { useState } from "react";

const meta: Meta<typeof Slider> = {
  title: "Components/ui/common/Slider",
  component: Slider,
  tags: ["autodocs"],

  args: {
    min: 0,
    max: 100,
    defaultValue: [25, 75],
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState([40]);

    return (
      <div className="w-64">
        <Slider value={value} onValueChange={setValue} />
        <div className="mt-2 text-sm text-foreground">
          Value: {value.join(", ")}
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: [30, 70],
    orientation: "vertical",
    className: "h-40",
  },
};

export const RangeSlider: Story = {
  args: {
    defaultValue: [20, 80],
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
};
