import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { calculateFullAge, DOMAIN } from "../../helpers";

import { AdvertisementProps } from "./Advertisement.props";

import { Button } from "../Button/Button.component";

import Close from "../../assets/icons/close.svg";
import SayHello from "../../assets/icons/sayHello.svg";

import styles from "./Advertisement.module.scss";

export const Advertisement = ({
  className,
  advertisement,
  type = "none",
  ...props
}: AdvertisementProps): JSX.Element => {
  const { years } = calculateFullAge(advertisement.birthDate);
  const { push } = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <div className={cn(styles.advertisement, className)} {...props}>
      {type === "favorite" && (
        <button className={cn(styles.advertisement__close)}>
          <Close />
        </button>
      )}

      {advertisement.images && advertisement.images.first && (
        <img
          className={cn(styles.advertisement__image)}
          src={`${DOMAIN}/images/${advertisement.images.first}`}
          width={280}
          height={350}
        />
      )}

      <div className={cn(styles.advertisement__wrapper)}>
        <div className={cn(styles.advertisement__info)}>
          <h3 className={cn(styles.advertisement__name)}>
            {advertisement.advName} {years}
          </h3>

          {/* <span className={cn(styles.advertisement__region)}>
            {i18n.language === "en" ? advertisement.region.nameEn : advertisement.region.nameRu}
          </span> */}
        </div>

        <Button
          className={cn(styles.advertisement__button)}
          onClick={() =>
            push(`/${advertisement.searchName}`, `/${advertisement.searchName}`, { locale: i18n.language })
          }
        >
          <span>{t("button:show-profile")}</span>
          <SayHello />
        </Button>
      </div>
    </div>
  );
};
