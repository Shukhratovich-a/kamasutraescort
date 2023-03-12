export enum NavEnum {
  Home = "home",
  Adv = "advertisements",
  Subscription = "subscription",
}

export interface NavItem {
  route: string;
  name: NavEnum;
  id: NavEnum;
}
