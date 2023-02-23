import React from "react";
import cn from "classnames";

import { InputProps } from "./Input.props";

import Mail from "../../assets/icons/mail.svg";
import Password from "../../assets/icons/password.svg";
import User from "../../assets/icons/user.svg";
import Error from "../../assets/icons/error.svg";
import Show from "../../assets/icons/show.svg";
import Hide from "../../assets/icons/hide.svg";

import styles from "./Input.module.scss";

export const Input = React.forwardRef(
  (
    { className, appearance = "none", error, type, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const [isShow, setIsShow] = React.useState(false);

    return (
      <label
        className={cn(styles.input__label, className, {
          [styles["input__label--error"]]: error,
        })}
      >
        <span className={cn(styles.input__icon)}>
          {appearance === "mail" ? (
            <Mail />
          ) : appearance === "password" ? (
            <Password />
          ) : appearance === "user" ? (
            <User />
          ) : null}
        </span>

        <input
          className={cn(styles.input)}
          type={(appearance === "password" || type === "password") && !isShow ? "password" : "text"}
          ref={ref}
          {...props}
        />

        {error && (
          <span
            className={cn(styles.input__error, {
              [styles["input__error--active"]]: error,
            })}
            title={error && error.message}
          >
            <Error />
          </span>
        )}

        {(appearance === "password" || type === "password") && !error && (
          <span className={cn(styles.input__mode)} onClick={() => setIsShow(!isShow)}>
            {isShow ? <Hide /> : <Show />}
          </span>
        )}
      </label>
    );
  }
);
