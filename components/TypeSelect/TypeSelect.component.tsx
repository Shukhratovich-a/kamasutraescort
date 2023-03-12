import React from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { TypeEnum } from "../../interfaces";

import { TypeSelectProps } from "./TypeSelect.props";

import styles from "./TypeSelect.module.scss";

export const TypeSelect = React.forwardRef(
  (
    { className, type, setType, isEditable, error, ...props }: TypeSelectProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [typeArray] = React.useState<TypeEnum[]>([...Object.values(TypeEnum)]);
    const { t } = useTranslation();

    const onClick = (i: TypeEnum) => {
      if (!isEditable || !setType) return;
      setType(i);
    };

    const handleSpace = (i: TypeEnum, evt: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isEditable || evt.code != "Space" || !setType) return;
      setType(i);
    };

    return (
      <div
        className={cn(styles.type, className, {
          [styles["type--error"]]: error,
        })}
        ref={ref}
        {...props}
      >
        {typeArray.map((typeItem) => (
          <button
            className={cn(styles.type__button, styles[`type__button--${typeItem}`], {
              [styles[`type__button--${typeItem}--active`]]: type === typeItem,
            })}
            type="button"
            tabIndex={isEditable ? 0 : -1}
            onClick={() => onClick(typeItem)}
            onKeyDown={(evt: React.KeyboardEvent<HTMLButtonElement>) => handleSpace(typeItem, evt)}
            key={typeItem}
          >
            {t(`type:${typeItem}`)}
          </button>
        ))}
      </div>
    );
  }
);
