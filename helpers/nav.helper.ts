import { NavItem, NavItems } from "../interfaces/nav.interface";

export const NavList: NavItem[] = [
  {
    id: NavItems.Home,
    name: "home",
    route: "/",
  },
  {
    id: NavItems.Messages,
    name: "messages",
    route: "/message",
  },
  {
    id: NavItems.Subscription,
    name: "subscription",
    route: "/subscription",
  },
];
