import React from "react";
import cn from "classnames";

import styles from "./DateSelect.module.scss";
import { getDaysInMonth, getYear, format, getDate, getMonth } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import { DateSelectProps } from "./DateSelect.props";
import { useTranslation } from "next-i18next";

import Marker from "../../assets/icons/marker.svg";

export const DateSelect = React.forwardRef(
  ({ date, setDate }: DateSelectProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { i18n } = useTranslation();

    const buildDays = () => {
      const daysArray = [];

      for (let i = 1; i <= getDaysInMonth(date ? new Date(date) : new Date(2000)); i++) {
        daysArray.push(i);
      }

      return (
        <div className={cn(styles.select__list)}>
          {daysArray.map((day) => (
            <div className={cn(styles.select__list__item)} key={day}>
              {day}
            </div>
          ))}
        </div>
      );
    };

    const buildMonth = () => {
      const monthsArray = [];

      for (let i = 0; i < 12; i++) {
        monthsArray.push(i);
      }

      return (
        <div className={cn(styles.select__list, styles["select__list--month"])}>
          {monthsArray.map((month) => {
            return (
              <div className={cn(styles.select__list__item)} key={month}>
                {format(new Date(2000, month), "LLLL", { locale: i18n.language === "ru" ? ru : enUS })}
              </div>
            );
          })}
        </div>
      );
    };

    const buildYears = () => {
      const yearsArray = [];

      for (let i = getYear(new Date()) - 100; i <= getYear(new Date()); i++) {
        yearsArray.push(i);
      }

      return (
        <div className={cn(styles.select__list)}>
          {yearsArray.map((year) => (
            <div className={cn(styles.select__list__item)} key={year}>
              {year}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className={cn(styles["select-wrapper"])} ref={ref}>
        <div className={cn(styles.select, styles["select--day"])}>
          <div className={cn(styles.select__selected)}>День</div>
          {buildDays()}
        </div>

        <div className={cn(styles.select, styles["select--month"])}>
          <div className={cn(styles.select__selected, styles["select__selected--month"])}>
            Месяц
            <Marker />
          </div>
          {buildMonth()}
        </div>

        <div className={cn(styles.select, styles["select--year"])}>
          <div className={cn(styles.select__selected)}>Год</div>

          {buildYears()}
        </div>
      </div>
    );
  }
);
