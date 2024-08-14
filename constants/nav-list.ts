import { NavItem } from "@/types/navbar";
import { DESTINATION } from "./destination";

export const NAV_LIST_DESKTOP: Array<NavItem> = [
  {
    id: "1",
    label: "Home",
    destination: DESTINATION.HOME,
  },
  {
    id: "2",
    label: "Product",
    destination: DESTINATION.PRODUCT,
  },
  {
    id: "3",
    label: "Pricing",
    destination: "/#",
  },
  {
    id: "4",
    label: "Contact",
    destination: "/#",
  },
];

export const NAV_LIST_MOBILE: Array<NavItem> = [
  ...NAV_LIST_DESKTOP,
  {
    id: "5",
    label: "LOGIN",
    destination: "/#",
  },
  { id: "6", label: "JOIN US", destination: "/#" },
];
