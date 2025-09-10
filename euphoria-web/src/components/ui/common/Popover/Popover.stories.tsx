import type { Meta, StoryObj } from "@storybook/nextjs";
import { Popover, PopoverTrigger, PopoverContent } from ".";
import { Button } from "../Button";

const meta: Meta<typeof Popover> = {
  title: "Components/ui/common/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="default">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">This is a popover content.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithCustomContent: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="secondary">Show Details</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Extra Info</h3>
          <p className="text-muted-foreground text-sm">
            You can place anything here: text, forms, or even other components.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
