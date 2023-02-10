import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { AuthHeaderProps } from "./AuthHeader.props";

import { Button, Container } from "../../components";

import styles from "./AuthHeader.module.scss";

export const AuthHeader = ({ className, ...props }: AuthHeaderProps): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation();
  const { asPath } = router;

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Container className={cn(styles.header__container)}>
        <Link className={cn(styles.header__logo)} href={"/"}>
          <span>Kamasutraescort</span>
        </Link>

        <span className={cn(styles.header__text)}>
          {asPath === "/auth/register" ? t("auth:have-account") : t("auth:first-time")}
        </span>

        <Button className={cn(styles.header__link)} appearance="linear-primary">
          <Link href={asPath === "/auth/register" ? "/auth/login" : "/auth/register"}>
            {asPath === "/auth/register" ? t("auth:login") : t("auth:register")}
          </Link>
        </Button>
      </Container>
    </header>
  );
};
