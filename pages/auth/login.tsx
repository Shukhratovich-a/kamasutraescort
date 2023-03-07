import React from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../../layout/Layout";

import { Container, RoleSelect } from "../../components";
import { LoginForm } from "../../page-components";

import styles from "../../styles/pages/Login.module.scss";

const Login = (): JSX.Element => {
  const router = useRouter();
  const { query } = router;
  const { t } = useTranslation();
  // const { i18n } = useTranslation();

  // const [forgotState, setForgotState] = React.useState(false);
  const [registerState, setRegisterState] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { register } = query;
    if (register === "type") {
      setRegisterState(true);
    } else {
      setRegisterState(false);
    }
  }, [query]);

  return (
    <>
      <RoleSelect isOpen={registerState} setIsOpen={setRegisterState} />
      {/* <ForgotPassword isOpen={forgotState} /> */}
      <Container className={cn(styles.login__container)}>
        <h1 className={cn(styles.login__heading)}>{t("auth:login-heading")}</h1>

        <p className={cn(styles.login__description)}>{t("auth:login-description")}</p>

        <LoginForm className={cn(styles.login__form)} />

        {/* <Link
          className={cn(styles.login__link)}
          href={{
            pathname: router.asPath,
            query: { password: "forgot" },
          }}
          locale={i18n.language}
        >
          {t("auth:login-password")}
        </Link> */}
      </Container>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withLayout(Login, styles.body);
