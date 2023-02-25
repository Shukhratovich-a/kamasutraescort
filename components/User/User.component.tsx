import cn from "classnames";

import { UserProps } from "./User.props";

import { Button } from "../Button/Button.component";

import image from "../../assets/photo.jpg";

import Close from "../../assets/icons/close.svg";
import SayHello from "../../assets/icons/sayHello.svg";

import styles from "./User.module.scss";

export const User = ({ ...props }: UserProps) => {
  return (
    <div className={cn(styles.user)} {...props}>
      <button className={cn(styles.user__close)}>
        <Close />
      </button>

      <img className={cn(styles.user__image)} src={image.src} width={280} height={350} />

      <div className={cn(styles.user__wrapper)}>
        <div className={cn(styles.user__info)}>
          <h3 className={cn(styles.user__name)}>Марина</h3>
          <span className={cn(styles.user__region)}>Россия</span>
        </div>

        <Button className={cn(styles.user__button)}>
          <span>Поприветствовать</span>
          <SayHello />
        </Button>
      </div>
    </div>
  );
};
