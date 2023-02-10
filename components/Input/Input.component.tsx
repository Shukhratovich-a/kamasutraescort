import React from "react";
import cn from "classnames";

import { InputProps } from "./Input.props";

import Mail from "../../assets/icons/mail.svg";
import Password from "../../assets/icons/password.svg";
import User from "../../assets/icons/user.svg";
import Error from "../../assets/icons/error.svg";

import styles from "./Input.module.scss";

export const Input = React.forwardRef(
  (
    { className, appearance = "user", error, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <label
        className={cn(styles.input__label, className, {
          [styles["input__label--error"]]: error,
        })}
      >
        <span className={cn(styles.input__icon)}>
          {appearance === "mail" ? <Mail /> : appearance === "password" ? <Password /> : <User />}
        </span>

        <input
          className={cn(styles.input)}
          type={appearance === "password" ? "password" : "text"}
          ref={ref}
          {...props}
        />

        <span
          className={cn(styles.input__error, {
            [styles["input__error--active"]]: error,
          })}
          title={error && error.message}
        >
          <Error />
        </span>
      </label>
    );
  }
);
