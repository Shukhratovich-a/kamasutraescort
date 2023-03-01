import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import { useMediaQuery } from "../../hooks";
import { HeaderProps } from "./Header.props";

import { Container, HeaderProfile } from "../../components";
import { Nav } from "../Nav/Nav.component";

import Burger from "../../assets/icons/burger.svg";
import Close from "../../assets/icons/x.svg";

import styles from "./Header.module.scss";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { i18n } = useTranslation();
  const [isSticky, setIsSticky] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 810px)");

  const handleScroll = React.useCallback(() => {
    if (isMobile) return;
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 50 ? true : false;
    setIsSticky(stickyClass);
  }, [isMobile]);

  const handleClick = () => {
    if (!isMobile) return;

    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    if (window === undefined) return;
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header
      className={cn(styles.header, className, {
        [styles["header--sticky"]]: isSticky,
      })}
      {...props}
    >
      <Container className={cn(styles.header__container)}>
        <Link className={cn(styles.header__link)} href={"/"} locale={i18n.language}>
          <span>Kamasutraescort</span>
        </Link>

        <Nav
          className={cn(styles.header__nav, {
            [styles["header__nav--open"]]: isMobile && isOpen,
          })}
          isSticky={isSticky}
          isMobile={isMobile}
        />

        <HeaderProfile className={styles.header__profile} isMobile={isMobile} />

        {isMobile && (
          <button className={cn(styles.header__button)} onClick={handleClick}>
            {isOpen ? <Close /> : <Burger />}
          </button>
        )}
      </Container>
    </header>
  );
};
