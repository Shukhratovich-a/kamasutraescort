import cn from "classnames";

import { UserProps } from "./User.props";

import { Button } from "../Button/Button.component";

import Close from "../../assets/icons/close.svg";
import SayHello from "../../assets/icons/sayHello.svg";

import styles from "./User.module.scss";
import { format, intervalToDuration, parse } from "date-fns";
import { DOMAIN } from "../../helpers";

export const User = ({ user, type = "none", ...props }: UserProps) => {
  function calculateFullAge(dob: Date) {
    const dateString = format(new Date(dob), "dd/MM/yyyy");
    const birthDate = parse(dateString, "dd/MM/yyyy", new Date());

    const { years, months, days } = intervalToDuration({ start: birthDate, end: new Date() });
    return { years, months, days };
  }

  const { years } = calculateFullAge(user.birthDate);

  return (
    <div className={cn(styles.user)} {...props}>
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

        <Button className={cn(styles.user__button)}>
          <span>Поприветствовать</span>
          <SayHello />
        </Button>
      </div>
    </div>
  );
};
