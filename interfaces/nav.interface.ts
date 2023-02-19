export enum NavEnum {
  Home = "home",
  Messages = "messages",
  Subscription = "subscription",
}

export interface NavItem {
  route: string;
  name: NavEnum;
  id: NavEnum;
}
