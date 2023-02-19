import { ProfileMenuItem, ProfileMenuEnum } from "../interfaces";

import ProfileIcon from "./icons/profile.svg";
import FavoritesIcon from "./icons/favorites.svg";
import AccountIcon from "./icons/account.svg";

export const profileMenu: ProfileMenuItem[] = [
  {
    id: ProfileMenuEnum.Profile,
    name: ProfileMenuEnum.Profile,
    route: "",
    icon: <ProfileIcon />,
  },
  {
    id: ProfileMenuEnum.Favorites,
    name: ProfileMenuEnum.Favorites,
    route: "/" + ProfileMenuEnum.Favorites,
    icon: <FavoritesIcon />,
  },
  {
    id: ProfileMenuEnum.Account,
    name: ProfileMenuEnum.Account,
    route: "/" + ProfileMenuEnum.Account,
    icon: <AccountIcon />,
  },
];
