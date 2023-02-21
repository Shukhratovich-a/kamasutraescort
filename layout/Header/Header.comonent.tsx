import Link from "next/link";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import { HeaderProps } from "./Header.props";

import { Container, HeaderProfile } from "../../components";
import { Nav } from "../Nav/Nav.component";

import styles from "./Header.module.scss";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { i18n } = useTranslation();

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Container className={cn(styles.header__container)}>
        <Link className={cn(styles.header__link)} href={"/"} locale={i18n.language}>
          <span>Kamasutraescort</span>
        </Link>

        <Nav className={cn(styles.header__nav)} />

        <HeaderProfile className={styles.header__profile} />
      </Container>
    </header>
  );
};
