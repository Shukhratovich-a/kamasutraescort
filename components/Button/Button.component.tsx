import React from "react";
import cn from "classnames";

import { ButtonProps } from "./Button.props";

import Waiting from "../../assets/spinners/waiting.svg";

import styles from "./Button.module.scss";

export const Button = React.forwardRef(
  (
    { className, children, appearance = "primary", isLoading = false, ...props }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <button
        className={cn(styles.button, className, {
          [styles["button--primary"]]: appearance === "primary",
          [styles["button--secondary"]]: appearance === "secondary",
          [styles["button--red"]]: appearance === "red",
          [styles["button--linear-primary"]]: appearance === "linear-primary",
          [styles["button--linear-blue"]]: appearance === "linear-blue",
        })}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Waiting /> : children}
      </button>
    );
  }
);
