import React from "react";
import { useTranslation } from "next-i18next";
import { getDaysInMonth, getYear, format, getDate, getMonth } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import cn from "classnames";

import { DateSelectProps } from "./DateSelect.props";

import Marker from "../../assets/icons/marker.svg";

import styles from "./DateSelect.module.scss";

export const DateSelect = React.forwardRef(
  ({ date, setDate }: DateSelectProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    const { t, i18n } = useTranslation();

    const [isYearOpen, setIsYearOpen] = React.useState<boolean>(false);
    const [isMonthOpen, setIsMonthOpen] = React.useState<boolean>(false);
    const [isDayOpen, setIsDayOpen] = React.useState<boolean>(false);

    const [selectedYear, selectYear] = React.useState<number>(date ? getYear(new Date(date)) : 2000);
    const [selectedMonth, selectMonth] = React.useState<number>(date ? getMonth(new Date(date)) : 0);
    const [selectedDay, selectDay] = React.useState<number>(date ? getDate(new Date(date)) : 1);

    const [days, setDays] = React.useState(getDaysInMonth(new Date(selectedYear, selectedMonth, selectedDay)));

    const yearRef: React.RefObject<HTMLDivElement> = React.useRef(null);
    const monthRef: React.RefObject<HTMLDivElement> = React.useRef(null);
    const dayRef: React.RefObject<HTMLDivElement> = React.useRef(null);

    React.useEffect(() => {
      if (!setDate) return;
      setDays(getDaysInMonth(new Date(selectedYear, selectedMonth, selectedDay)));
      setDate(new Date(selectedYear, selectedMonth, selectedDay));
    }, [selectedYear, selectedMonth, selectedDay, setDate]);

    React.useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function handleClickOutside(evt: any) {
        if (yearRef?.current && !yearRef?.current.contains(evt.target)) {
          setIsYearOpen(false);
        }
      }

      if (!isYearOpen) return;

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [yearRef, isYearOpen]);

    React.useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function handleClickOutside(evt: any) {
        if (monthRef?.current && !monthRef?.current.contains(evt.target)) {
          setIsMonthOpen(false);
        }
      }

      if (!isMonthOpen) return;

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [monthRef, isMonthOpen]);

    React.useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function handleClickOutside(evt: any) {
        if (dayRef?.current && !dayRef?.current.contains(evt.target)) {
          setIsDayOpen(false);
        }
      }

      if (!isDayOpen) return;

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dayRef, isDayOpen]);

    const buildDays = () => {
      const daysArray = new Array(days).fill(0);

      return (
        <motion.div
          className={cn(styles.select__list)}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isDayOpen ? 300 : 0, opacity: isDayOpen ? 1 : 0 }}
          transition={{ duration: 0.1, default: { ease: "easeOut" } }}
        >
          {daysArray.map((_, day) => (
            <div
              className={cn(styles.select__list__item, {
                [styles["select__list__item--active"]]: day + 1 === selectedDay,
              })}
              key={day}
              onClick={() => {
                selectDay(day + 1);
                setIsDayOpen(false);
              }}
            >
              {day + 1}
            </div>
          ))}
        </motion.div>
      );
    };

    const buildMonth = () => {
      const monthsArray = new Array(12).fill(0);

      return (
        <motion.div
          className={cn(styles.select__list, styles["select__list--month"])}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMonthOpen ? 300 : 0, opacity: isMonthOpen ? 1 : 0 }}
          transition={{ duration: 0.1, default: { ease: "easeOut" } }}
        >
          {monthsArray.map((_, month) => {
            return (
              <div
                className={cn(styles.select__list__item, {
                  [styles["select__list__item--active"]]: month === selectedMonth,
                })}
                key={month}
                onClick={() => {
                  selectMonth(month);
                  setIsMonthOpen(false);
                }}
              >
                {format(new Date(2000, month), "LLLL", { locale: i18n.language === "ru" ? ru : enUS })}
              </div>
            );
          })}
        </motion.div>
      );
    };

    const buildYears = () => {
      const yearsArray = [];

      for (let i = getYear(new Date()); i >= getYear(new Date()) - 100; i--) {
        yearsArray.push(i);
      }

      return (
        <motion.div
          className={cn(styles.select__list)}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isYearOpen ? 300 : 0, opacity: isYearOpen ? 1 : 0 }}
          transition={{ duration: 0.1, default: { ease: "easeOut" } }}
        >
          {yearsArray.map((year) => (
            <div
              className={cn(styles.select__list__item, {
                [styles["select__list__item--active"]]: year === selectedYear,
              })}
              key={year}
              onClick={() => {
                selectYear(year);
                setIsYearOpen(false);
              }}
            >
              {year}
            </div>
          ))}
        </motion.div>
      );
    };

    return (
      <div className={cn(styles["select-wrapper"])} ref={ref}>
        <div className={cn(styles.select, styles["select--day"])}>
          <div className={cn(styles.select__selected)} onClick={() => setIsDayOpen(!isDayOpen)} ref={dayRef}>
            {date ? selectedDay : t("input:day")}
          </div>

          {buildDays()}
        </div>

        <div className={cn(styles.select, styles["select--month"])}>
          <div
            className={cn(styles.select__selected, styles["select__selected--month"])}
            onClick={() => setIsMonthOpen(!isMonthOpen)}
            ref={monthRef}
          >
            {date
              ? format(new Date(2000, selectedMonth), "LLLL", { locale: i18n.language === "ru" ? ru : enUS })
              : t("input:month")}

            <Marker />
          </div>

          {buildMonth()}
        </div>

        <div className={cn(styles.select, styles["select--year"])}>
          <div className={cn(styles.select__selected)} onClick={() => setIsYearOpen(!isYearOpen)} ref={yearRef}>
            {date ? selectedYear : t("input:year")}
          </div>

          {buildYears()}
        </div>
      </div>
    );
  }
);
