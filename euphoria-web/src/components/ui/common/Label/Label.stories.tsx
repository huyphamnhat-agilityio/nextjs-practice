import type { Meta, StoryObj } from "@storybook/nextjs";
import { Label } from ".";
import { Input } from "../Input"; // optional, just for demo

const meta: Meta<typeof Label> = {
  title: "Components/ui/common/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Email address",
    htmlFor: "email",
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} />
      <Input id="email" placeholder="Enter your email" />
    </div>
  ),
};
