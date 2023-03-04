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
    {
      className,
      selected,
      setSelected,
      selectArray,
      isEditable = false,
      placeholder,
      icon,
      error,
      ...props
    }: SelectProps,
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

    const handleSpace = (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isEditable || evt.code != "Space") return;
      setIsOpen(!isOpen);
    };

    const handleSelect = (evt: React.KeyboardEvent<HTMLDivElement>, id: number) => {
      if (!isEditable || evt.code != "Enter" || !setSelected) return;
      setSelected(id === 0 ? null : id);
      setIsOpen(false);
    };

    const handleMove = (evt: React.KeyboardEvent<HTMLDivElement>, i: number) => {
      if (!isEditable || evt.code != "Tab" || i !== selectArray.length - 1) return;
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
          tabIndex={-1}
        >
          {selectArray.map((selectItem: SelectItem, index) => (
            <div
              className={cn(styles.select__list__item, {
                [styles["select__list__item--null"]]: selectItem.id === 0,
              })}
              key={selectItem.id}
              onClick={() => onClick(selectItem.id)}
              onKeyDown={(evt) => (evt.code == "Tab" ? handleMove(evt, index) : handleSelect(evt, selectItem.id))}
              tabIndex={isOpen ? 0 : -1}
            >
              {language === "en" ? selectItem.nameEn : selectItem.nameRu}
            </div>
          ))}
        </motion.div>
      );
    };

    return (
      <div
        className={cn(styles.select, className, {
          [styles["select--open"]]: isOpen,
          [styles["select--error"]]: error,
          [styles["select--focus"]]: isOpen,
        })}
        {...props}
        ref={listRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={cn(styles.select__selected, {
            [styles["select__selected--placeholder"]]: !selected,
          })}
          ref={ref}
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(evt) => handleSpace(evt)}
        >
          {icon && <span className={cn(styles.select__icon)}>{icon}</span>}

          <span className={cn(styles.select__selected__text)}>
            {selectedItem ? (language === "en" ? selectedItem.nameEn : selectedItem.nameRu) : placeholder}
          </span>

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
        </div>

        {buildSelectItems()}
      </div>
    );
  }
);
