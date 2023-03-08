import cn from "classnames";

import { AdavertisementProps } from "./Adavertisement.props";

import { Button } from "../Button/Button.component";

import Close from "../../assets/icons/close.svg";
import SayHello from "../../assets/icons/sayHello.svg";

import styles from "./Adavertisement.module.scss";
import { calculateFullAge, DOMAIN } from "../../helpers";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export const Adavertisement = ({ className, adavertisement, type = "none", ...props }: AdavertisementProps) => {
  const { years } = calculateFullAge(adavertisement.birthDate);
  const { push } = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <div className={cn(styles.user, className)} {...props}>
      {type === "favorite" && (
        <button className={cn(styles.user__close)}>
          <Close />
        </button>
      )}

      {adavertisement.images && adavertisement.images.first && (
        <img
          className={cn(styles.user__image)}
          src={`${DOMAIN}/images/${adavertisement.images.first}`}
          width={280}
          height={350}
        />
      )}

      <div className={cn(styles.user__wrapper)}>
        <div className={cn(styles.user__info)}>
          <h3 className={cn(styles.user__name)}>
            {adavertisement.advName} {years}
          </h3>

          {/* <span className={cn(styles.user__region)}>
            {i18n.language === "en" ? user.region.nameEn : user.region.nameRu}
          </span> */}
        </div>

        <Button
          className={cn(styles.user__button)}
          onClick={() =>
            push(`/${adavertisement.searchName}`, `/${adavertisement.searchName}`, { locale: i18n.language })
          }
        >
          <span>{t("button:show-profile")}</span>
          <SayHello />
        </Button>
      </div>
    </div>
  );
};
