import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Components/ui/common/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "Enter text...",
    disabled: false,
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "file", "number", "search"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
  decorators: (Story) => (
    <div className="w-80">
      <Story />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter your name",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const FileUpload: Story = {
  args: {
    type: "file",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};
