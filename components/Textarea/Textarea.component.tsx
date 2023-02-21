import React from "react";
import cn from "classnames";

import { TextareaProps } from "./Textarea.props";

import Error from "../../assets/icons/error.svg";

import styles from "./Textarea.module.scss";

export const Textarea = React.forwardRef(
  ({ className, error, ...props }: TextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
      <label
        className={cn(styles.textarea__label, className, {
          [styles["textarea__label--error"]]: error,
        })}
      >
        <textarea className={cn(styles.textarea)} ref={ref} {...props} />

        {error && (
          <span
            className={cn(styles.textarea__error, {
              [styles["textarea__error--active"]]: error,
            })}
            title={error && error.message}
          >
            <Error />
          </span>
        )}
      </label>
    );
  }
);
