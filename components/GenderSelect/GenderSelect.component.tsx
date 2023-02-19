import React from "react";
import cn from "classnames";

import { GenderEnum } from "../../interfaces";

import { GenderSelectProps } from "./GenderSelect.props";

import styles from "./GenderSelect.module.scss";

export const GenderSelect = React.forwardRef(
  (
    { className, gender, error, setGender, isEditable, ...props }: GenderSelectProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [genderArray] = React.useState<GenderEnum[]>([...Object.values(GenderEnum)]);

    const onClick = (i: GenderEnum) => {
      if (!isEditable || !setGender) return;
      setGender(i);
    };

    const handleSpace = (i: GenderEnum, e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isEditable || e.code != "Space" || !setGender) return;
      setGender(i);
    };

    return (
      <div
        className={cn(styles.gender, className, {
          [styles["gender--error"]]: error,
        })}
        ref={ref}
        {...props}
      >
        {genderArray.map((genderItem) => (
          <button
            className={cn(styles.gender__button, styles[`gender__button--${genderItem}`], {
              [styles[`gender__button--${genderItem}--active`]]: gender === genderItem,
            })}
            type="button"
            tabIndex={isEditable ? 0 : -1}
            onClick={() => onClick(genderItem)}
            onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => handleSpace(genderItem, e)}
            key={genderItem}
          >
            {genderItem}
          </button>
        ))}
      </div>
    );
  }
);