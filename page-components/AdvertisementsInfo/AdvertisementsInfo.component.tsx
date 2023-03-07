import cn from "classnames";
import { useTranslation } from "next-i18next";

import { AdvetisementsInfoProps } from "./AdvertisementsInfo.props";

import styles from "./AdvertisementsInfo.module.scss";
import { Adavertisement, Button } from "../../components";
import Link from "next/link";
import { useRouter } from "next/router";

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
              <Adavertisement adavertisement={advertisement} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
