import { Meta, StoryObj } from "@storybook/nextjs";
import { cloneElement, ReactElement } from "react";

// Components
import {
  CartIcon,
  ClothIcon,
  CreditCardIcon,
  GoogleIcon,
  HamburgerMenuIcon,
  ShippingIcon,
  ShippingReturnIcon,
  TwitterIcon,
  UserIcon,
} from "@/components/icons";

type StoryWrapper = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement<unknown, string>;

const meta: Meta<StoryWrapper> = {
  title: "Components/ui/common/Icons",
  component: CartIcon,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<StoryWrapper>;

const template: Story = {
  render: ({ children, ...rest }) => {
    return cloneElement(children, rest);
  },
};

export const ClothIconStory: Story = {
  ...template,
  args: {
    children: <ClothIcon />,
  },
};

export const CreditCardIconStory: Story = {
  ...template,
  args: {
    children: <CreditCardIcon />,
  },
};

export const CartIconStory: Story = {
  ...template,
  args: {
    children: <CartIcon />,
  },
};

export const GoogleIconStory: Story = {
  ...template,
  args: {
    children: (
      <div className="bg-black">
        <GoogleIcon />
      </div>
    ),
  },
};

export const HamburgerMenuIconStory: Story = {
  ...template,
  args: {
    children: <HamburgerMenuIcon />,
  },
};

export const ShippingIconStory: Story = {
  ...template,
  args: {
    children: <ShippingIcon />,
  },
};

export const ShippingReturnIconStory: Story = {
  ...template,
  args: {
    children: <ShippingReturnIcon />,
  },
};

export const TwitterIconStory: Story = {
  ...template,
  args: {
    children: <TwitterIcon />,
  },
};

export const UserIconStory: Story = {
  ...template,
  args: {
    children: <UserIcon />,
  },
};
