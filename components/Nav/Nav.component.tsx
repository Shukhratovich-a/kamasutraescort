import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";

import { NavList } from "../../helpers/nav.helper";

import { NavProps } from "./Nav.props";

import styles from "./Nav.module.scss";

export const Nav = ({ className, ...props }: NavProps): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const { asPath } = router;

  return (
    <nav className={cn(styles.nav, className)} {...props}>
      <ul className={cn(styles.nav__list)}>
        {NavList.map((navItem) => (
          <li className={cn(styles.nav__item)} key={navItem.id}>
            <Link
              className={cn(styles.nav__link, {
                [styles["nav__link--active"]]: asPath === navItem.route,
              })}
              href={navItem.route}
            >
              {t(`nav:${navItem.name}`)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
