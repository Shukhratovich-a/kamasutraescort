import { NavItem, NavEnum } from "../interfaces/";

export const navList: NavItem[] = [...Object.values(NavEnum)].map((nav: NavEnum) => {
  if (nav === "home") {
    return {
      id: nav,
      name: nav,
      route: `/`,
    };
  }

  return {
    id: nav,
    name: nav,
    route: `/${nav}`,
  };
});
