import cn from "classnames";
import { useTranslation } from "next-i18next";

import { FavoritesInfoProps } from "./FavoritesInfo.props";

import styles from "./FavoritesInfo.module.scss";

export const FavoritesInfo = ({ ...props }: FavoritesInfoProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.favorites)} {...props}>
      <h2 className={cn(styles.favorites__heading)}>{t("profile:favorites")}</h2>

      <div className={cn(styles.favorites__list)}>
        {/* <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User /> */}
      </div>
    </div>
  );
};
