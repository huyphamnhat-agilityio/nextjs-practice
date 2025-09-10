import type { Meta, StoryObj } from "@storybook/nextjs";
import { Toaster } from ".";
import { toast } from "sonner";
import { Button } from "../common";

const meta: Meta<typeof Toaster> = {
  title: "Components/ui/Toaster",
  component: Toaster,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

const Demo = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2">
        <Button onClick={() => toast("Hello world!")}>Show Toast</Button>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export const Default: Story = {
  render: () => <Demo />,
};
