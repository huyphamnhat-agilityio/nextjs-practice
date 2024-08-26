import { Meta, StoryObj } from "@storybook/react/*";
import { cloneElement, ReactElement } from "react";

// Components
import {
  AmazonLogo,
  BlackBoardIcon,
  CartIcon,
  CheckMarkIcon,
  DarkModeIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  EmailIcon,
  EyeIcon,
  FacebookLogoIcon,
  FavoriteIcon,
  HamburgerIcon,
  HeartIcon,
  HooliLogo,
  InstagramLogoIcon,
  LightModeIcon,
  LocationIcon,
  LyftLogo,
  MortarboardIcon,
  NextArrowIcon,
  OutlinedStarIcon,
  PieldPiperLogo,
  RedditLogo,
  RightArrowIcon,
  SolidStarIcon,
  StripeLogo,
  TelephoneIcon,
  TelescopeIcon,
  TwitterLogoIcon,
} from "@/components/common/Icons";

const StoryWrapper = ({ children }: { children: ReactElement }) => {
  return children;
};

const meta: Meta<typeof StoryWrapper> = {
  title: "Components/common/Icons",
  component: AmazonLogo,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof StoryWrapper>;

const template: Story = {
  render: ({ children, ...rest }) => {
    return cloneElement(children, rest);
  },
};

export const amazonLogoStory: Story = {
  ...template,
  args: {
    children: <AmazonLogo />,
  },
};

export const blackBoardIconStory: Story = {
  ...template,
  args: {
    children: <BlackBoardIcon />,
  },
};

export const cartIconStory: Story = {
  ...template,
  args: {
    children: <CartIcon />,
  },
};

export const checkMarkIconStory: Story = {
  ...template,
  args: {
    children: (
      <div className="bg-black">
        <CheckMarkIcon />
      </div>
    ),
  },
};

export const darkModeIconStory: Story = {
  ...template,
  args: {
    children: <DarkModeIcon />,
  },
};

export const downloadIconStory: Story = {
  ...template,
  args: {
    children: <DownloadIcon />,
  },
};

export const emailIconStory: Story = {
  ...template,
  args: {
    children: <EmailIcon />,
  },
};

export const eyeIconStory: Story = {
  ...template,
  args: {
    children: <EyeIcon />,
  },
};

export const facebookLogoIconStory: Story = {
  ...template,
  args: {
    children: <FacebookLogoIcon />,
  },
};

export const favoriteIconStory: Story = {
  ...template,
  args: {
    children: <FavoriteIcon />,
  },
};

export const hamburgerIconStory: Story = {
  ...template,
  args: {
    children: <HamburgerIcon />,
  },
};

export const heartIconStory: Story = {
  ...template,
  args: {
    children: (
      <div className="bg-black">
        <HeartIcon />
      </div>
    ),
  },
};

export const hooliLogoStory: Story = {
  ...template,
  args: {
    children: <HooliLogo />,
  },
};

export const instagramLogoIconStory: Story = {
  ...template,
  args: {
    children: <InstagramLogoIcon />,
  },
};

export const lightModeIconStory: Story = {
  ...template,
  args: {
    children: <LightModeIcon />,
  },
};

export const locationIconStory: Story = {
  ...template,
  args: {
    children: <LocationIcon />,
  },
};

export const lyftLogoStory: Story = {
  ...template,
  args: {
    children: <LyftLogo />,
  },
};

export const mortarboardIconStory: Story = {
  ...template,
  args: {
    children: <MortarboardIcon />,
  },
};

export const nextArrowIconStory: Story = {
  ...template,
  args: {
    children: <NextArrowIcon />,
  },
};

export const outlinedStarIconStory: Story = {
  ...template,
  args: {
    children: <OutlinedStarIcon />,
  },
};

export const pieldPiperLogoStory: Story = {
  ...template,
  args: {
    children: <PieldPiperLogo />,
  },
};

export const redditLogoStory: Story = {
  ...template,
  args: {
    children: <RedditLogo />,
  },
};

export const rightArrowIconStory: Story = {
  ...template,
  args: {
    children: <RightArrowIcon />,
  },
};

export const solidStarIconStory: Story = {
  ...template,
  args: {
    children: <SolidStarIcon />,
  },
};

export const stripeLogoStory: Story = {
  ...template,
  args: {
    children: <StripeLogo />,
  },
};

export const telephoneIconStory: Story = {
  ...template,
  args: {
    children: <TelephoneIcon />,
  },
};

export const telescopeIconStory: Story = {
  ...template,
  args: {
    children: <TelescopeIcon />,
  },
};

export const twitterLogoIconStory: Story = {
  ...template,
  args: {
    children: <TwitterLogoIcon />,
  },
};

export const editIconStory: Story = {
  ...template,
  args: {
    children: <EditIcon />,
  },
};

export const deleteIconStory: Story = {
  ...template,
  args: {
    children: <DeleteIcon />,
  },
};
