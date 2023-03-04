import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { AuthHeaderProps } from "./AuthHeader.props";

import { Button, Container } from "../../components";

import styles from "./AuthHeader.module.scss";

export const AuthHeader = ({ className, ...props }: AuthHeaderProps): JSX.Element => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { asPath } = router;

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Container className={cn(styles.header__container)}>
        <Link className={cn(styles.header__logo)} href={"/"} locale={i18n.language}>
          <span>Kamasutraescort</span>
        </Link>

        <span className={cn(styles.header__text)}>
          {asPath === "/auth/register" ? t("auth:have-account") : t("auth:first-time")}
        </span>

        <Button
          className={cn(styles.header__link)}
          appearance="linear-primary"
          onClick={() => {
            router.push(
              {
                pathname: "/auth/login",
                query: asPath.startsWith("/auth/login") ? { register: "type" } : "",
              },
              {
                pathname: "/auth/login",
                query: asPath.startsWith("/auth/login") ? { register: "type" } : "",
              },
              { locale: i18n.language }
            );
          }}
        >
          {asPath.startsWith("/auth/login") ? t("auth:register") : t("auth:login")}
        </Button>
      </Container>
    </header>
  );
};
