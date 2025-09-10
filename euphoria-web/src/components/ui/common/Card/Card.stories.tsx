import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from ".";

const meta: Meta<typeof Card> = {
  title: "Components/ui/common/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Card Title",
  },
  argTypes: {
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card>
      <CardHeader>
        <CardTitle>{args.title}</CardTitle>
        <CardDescription>Default description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{args.content}</p>
      </CardContent>
      <CardFooter>
        <p>Default footer</p>
      </CardFooter>
    </Card>
  ),
};
