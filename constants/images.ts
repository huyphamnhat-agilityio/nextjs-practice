import { Avatar } from "@/types";

export const IMAGES: Record<string, Avatar> = {
  HERO_BACKGROUND_THUMBNAIL: {
    src: "/hero-background-children.svg",
    alt: "An image of a child holding notebooks",
  },
  GET_QUALITY_SECTION_THUMBNAIL: {
    src: "/girl-holding-pencil-image.svg",
    alt: "An image of a girl holding a pencil",
  },
} as const;
