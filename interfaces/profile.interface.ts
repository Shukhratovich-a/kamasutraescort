export enum ProfileMenuEnum {
  Profile = "profile",
  Favorites = "favorites",
  Advertisements = "advertisements",
}

export interface ProfileMenuItem {
  route: string;
  name: ProfileMenuEnum;
  id: ProfileMenuEnum;
  icon: JSX.Element;
}
