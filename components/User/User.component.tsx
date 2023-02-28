import cn from "classnames";

import { UserProps } from "./User.props";

import { Button } from "../Button/Button.component";

import Close from "../../assets/icons/close.svg";
import SayHello from "../../assets/icons/sayHello.svg";

import styles from "./User.module.scss";
import { calculateFullAge, DOMAIN } from "../../helpers";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export const User = ({ className, user, type = "none", ...props }: UserProps) => {
  const { years } = calculateFullAge(user.birthDate);
  const router = useRouter();
  const { i18n } = useTranslation();

  return (
    <div className={cn(styles.user, className)} {...props}>
      {type === "favorite" && (
        <button className={cn(styles.user__close)}>
          <Close />
        </button>
      )}

      {user.images?.profileImageFirst && (
        <img
          className={cn(styles.user__image)}
          src={`${DOMAIN}/${user.images?.profileImageFirst}`}
          width={280}
          height={350}
        />
      )}

      <div className={cn(styles.user__wrapper)}>
        <div className={cn(styles.user__info)}>
          <h3 className={cn(styles.user__name)}>
            {user.username} {years}
          </h3>
          <span className={cn(styles.user__region)}>{user.region.nameEn}</span>
        </div>

        <Button
          className={cn(styles.user__button)}
          onClick={() => router.push(`/${user.username}`, `/${user.username}`, { locale: i18n.language })}
        >
          <span>Показать профиль</span>
          <SayHello />
        </Button>
      </div>
    </div>
  );
};
