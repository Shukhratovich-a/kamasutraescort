import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../../layout/Layout";

import { Container, ForgotPassword, LoginForm } from "../../components";

import styles from "../../styles/pages/Login.module.scss";

const Login = (): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation();

  const [forgotState, setForgotState] = React.useState(false);

  React.useEffect(() => {
    const { password } = router.query;
    if (password === "forgot") {
      setForgotState(true);
    } else {
      setForgotState(false);
    }
  }, [router]);

  return (
    <>
      <ForgotPassword isOpen={forgotState} />
      <Container className={cn(styles.login__container)}>
        <h1 className={cn(styles.login__heading)}>{t("auth:login-heading")}</h1>

        <p className={cn(styles.login__description)}>{t("auth:login-description")}</p>

        <LoginForm className={cn(styles.login__form)} />

        <Link
          className={cn(styles.login__link)}
          href={{
            pathname: router.asPath,
            query: { password: "forgot" },
          }}
        >
          {t("auth:login-password")}
        </Link>
      </Container>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default withLayout(Login, styles.body);
