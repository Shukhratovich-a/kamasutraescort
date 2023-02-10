import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAuthLayout } from "../../layout/Layout";

import { Container, LoginForm } from "../../components";

import VectorBig from "../../assets/background/vector-big.svg";
import VectorSmall from "../../assets/background/vector-small.svg";

import styles from "../../styles/pages/Login.module.scss";

const Login = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Container className={cn(styles.login__container)}>
        <h1 className={cn(styles.login__heading)}>Знакомства без преград</h1>

        <p className={cn(styles.login__description)}>
          Для современного мира сплочённость команды профессионалов однозначно фиксирует необходимость системы обучения
          кадров, соответствующей насущным потребностям.
        </p>

        <LoginForm className={cn(styles.login__form)} />

        <Link
          className={cn(styles.login__link)}
          href={{
            pathname: router.asPath,
            query: { type: "restore" },
          }}
        >
          Я не помню пароль
        </Link>
      </Container>

      <VectorBig className={cn(styles.login__vector, styles["login__vector--big"])} />
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
