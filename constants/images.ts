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

export const MAX_IMAGE_FILE_SIZE = 32000000;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
