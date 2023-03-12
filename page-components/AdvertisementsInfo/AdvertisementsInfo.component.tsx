import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { AdvetisementsInfoProps } from "./AdvertisementsInfo.props";

import { Advertisement, Button } from "../../components";

import styles from "./AdvertisementsInfo.module.scss";

export const AdvertisementsInfo = ({ advertisements, ...props }: AdvetisementsInfoProps): JSX.Element => {
  const { t } = useTranslation();

  const { asPath } = useRouter();

  return (
    <div className={cn(styles.advertisements)} {...props}>
      <h2 className={cn(styles.advertisements__heading)}>{t("profile:advertisements")}</h2>

      <Link href={asPath + "/create"} legacyBehavior>
        <Button>{t("profile:create-advetisement")}</Button>
      </Link>

      <ul className={cn(styles.advertisements__list)}>
        {advertisements.map((advertisement) => {
          return (
            <li className={cn(styles.advertisement)} key={advertisement.id}>
              <Advertisement advertisement={advertisement} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
