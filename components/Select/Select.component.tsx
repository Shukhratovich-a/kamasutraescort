import React from "react";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { SelectItem } from "../../interfaces";

import { SelectProps } from "./Select.props";

import Marker from "./marker.svg";

import styles from "./Select.module.scss";

export const Select = React.forwardRef(
  (
    { selected, setSelected, selectArray, isEditable = false, placeholder, ...props }: SelectProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { i18n } = useTranslation();
    const { language } = i18n;

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const listRef: React.RefObject<HTMLDivElement> = React.useRef(null);

    const selectedItem = selectArray.find((item) => item.id === selected);

    const onClick = (id: number): void => {
      if (!setSelected || !isEditable) return;
      setSelected(id);
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
            <div className={cn(styles.select__list__item)} key={selectItem.id} onClick={() => onClick(selectItem.id)}>
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
        })}
        {...props}
        ref={listRef}
      >
        <div
          className={cn(styles.select__selected, {
            [styles["select__selected--placeholder"]]: !selected,
          })}
          onClick={() => setIsOpen(!isOpen)}
          ref={ref}
        >
          {selectedItem ? (language === "en" ? selectedItem.nameEn : selectedItem.nameRu) : placeholder}
          <Marker />
        </div>

        {buildSelectItems()}
      </div>
    );
  }
);
