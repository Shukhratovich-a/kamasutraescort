import cn from "classnames";

import { ButtonProps } from "./Button.props";

import styles from "./Button.module.scss";

export const Button = ({ className, children, appearance = "primary", ...props }: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles["button--primary"]]: appearance === "primary",
        [styles["button--secondary"]]: appearance === "secondary",
        [styles["button--red"]]: appearance === "red",
      })}
      {...props}
    >
      {children}
    </button>
  );
};