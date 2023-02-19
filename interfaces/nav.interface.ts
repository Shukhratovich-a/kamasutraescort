export enum NavItems {
  Home = "home",
  Messages = "messages",
  Subscription = "subscription",
}

export interface NavItem {
  route: string;
  name: string;
  id: NavItems;
}
