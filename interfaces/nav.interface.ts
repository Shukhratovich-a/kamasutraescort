export enum NavEnum {
  Home = "home",
  Adv = "adv",
  Subscription = "subscription",
}

export interface NavItem {
  route: string;
  name: NavEnum;
  id: NavEnum;
}
