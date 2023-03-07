import { ProfileMenuItem, ProfileMenuEnum } from "../interfaces";

import ProfileIcon from "./icons/profile.svg";
import FavoritesIcon from "./icons/favorites.svg";
import AdvertisementIcon from "./icons/account.svg";

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
    id: ProfileMenuEnum.Advertisements,
    name: ProfileMenuEnum.Advertisements,
    route: "/" + ProfileMenuEnum.Advertisements,
    icon: <AdvertisementIcon />,
  },
];
