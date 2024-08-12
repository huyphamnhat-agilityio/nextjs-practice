import { NavItem } from "@/types/navbar";

export const NAV_LIST_DESKTOP: Array<NavItem> = [
  {
    id: "1",
    label: "Home",
    destination: "/",
  },
  {
    id: "2",
    label: "Product",
    destination: "/product",
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
