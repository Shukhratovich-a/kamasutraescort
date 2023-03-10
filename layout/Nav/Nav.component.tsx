import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";

import { navList } from "../../helpers";

import { NavProps } from "./Nav.props";

import styles from "./Nav.module.scss";

export const Nav = ({ className, isSticky = false, isMobile = false, ...props }: NavProps): JSX.Element => {
  const { t, i18n } = useTranslation();
  const { asPath, query } = useRouter();

  return (
    <nav
      className={cn(styles.nav, className, {
        [styles["nav--sticky"]]: !isMobile && isSticky,
        [styles["nav--mobile"]]: isMobile,
      })}
      {...props}
    >
      <ul className={cn(styles.nav__list)}>
        {navList.map((navItem) => {
          const key = Object.keys(query)[0];
          const value = Object.values(query)[0];

          return (
            <li className={cn(styles.nav__item)} key={navItem.id}>
              <Link
                className={cn(styles.nav__link, {
                  [styles["nav__link--active"]]: asPath === `${navItem.route}${key && value ? `?${key}=${value}` : ""}`,
                })}
                href={navItem.route}
                locale={i18n.language}
              >
                {t(`nav:${navItem.name}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
