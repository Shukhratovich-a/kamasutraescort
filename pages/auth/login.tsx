import React from "react";
import cn from "classnames";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAuthLayout } from "../../layout/Layout";

import { LoginForm } from "../../page-components";

import VectorBig from "../../assets/background/vector-big.svg";
import VectorSmall from "../../assets/background/vector-small.svg";

import styles from "../../styles/pages/Login.module.scss";

const Login = (): JSX.Element => {
  return (
    <>
      <VectorBig className={cn(styles.login__vector, styles["login__vector--big"])} />

      <LoginForm />

      <VectorSmall className={cn(styles.login__vector, styles["login__vector--small"])} />
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

export default withAuthLayout(Login, styles.body);
