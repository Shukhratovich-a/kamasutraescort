import React from "react";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { SelectItem } from "../../interfaces";

import { SelectProps } from "./Select.props";

import Marker from "../../assets/icons/marker.svg";
import Error from "../../assets/icons/error.svg";

import styles from "./Select.module.scss";

export const Select = React.forwardRef(
  (
    { selected, setSelected, selectArray, isEditable = false, placeholder, icon, error, ...props }: SelectProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { i18n } = useTranslation();
    const { language } = i18n;

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const listRef: React.RefObject<HTMLDivElement> = React.useRef(null);

    const selectedItem = selectArray.find((item) => item.id === selected);

    const onClick = (id: number): void => {
      if (!setSelected || !isEditable) return;
      setSelected(id === 0 ? null : id);
      setIsOpen(false);
    };

    React.useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function handleClickOutside(evt: any) {
        if (listRef?.current && !listRef?.current.contains(evt.target)) {
          setIsOpen(false);
        }
      }

      if (!isOpen) return;

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [listRef, isOpen]);

    const buildSelectItems = () => {
      return (
        <motion.div
          className={cn(styles.select__list)}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.1, default: { ease: "easeOut" } }}
        >
          {selectArray.map((selectItem: SelectItem) => (
            <div
              className={cn(styles.select__list__item, {
                [styles["select__list__item--null"]]: selectItem.id === 0,
              })}
              key={selectItem.id}
              onClick={() => onClick(selectItem.id)}
            >
              {language === "en" ? selectItem.nameEn : selectItem.nameRu}
            </div>
          ))}
        </motion.div>
      );
    };

    return (
      <div
        className={cn(styles.select, {
          [styles["select--open"]]: isOpen,
          [styles["select--error"]]: error,
        })}
        {...props}
        ref={listRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <span className={cn(styles.select__icon)}>{icon}</span>}

        <div
          className={cn(styles.select__selected, {
            [styles["select__selected--placeholder"]]: !selected,
          })}
          ref={ref}
        >
          {selectedItem ? (language === "en" ? selectedItem.nameEn : selectedItem.nameRu) : placeholder}
        </div>

        {error ? (
          <span
            className={cn(styles.input__error, {
              [styles["input__error--active"]]: error,
            })}
            title={error && error.message}
          >
            <Error />
          </span>
        ) : (
          <span className={cn(styles.select__marker)}>
            <Marker />
          </span>
        )}

        {buildSelectItems()}
      </div>
    );
  }
);
