export enum ProfileMenuEnum {
  Profile = "profile",
  Favorites = "favorites",
  Account = "account",
}

export interface ProfileMenuItem {
  route: string;
  name: ProfileMenuEnum;
  id: ProfileMenuEnum;
  icon: JSX.Element;
}
