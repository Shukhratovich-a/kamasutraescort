import cn from "classnames";
// import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAuthLayout } from "../../layout/Layout";

import { Container, RegisterForm } from "../../components";

import VectorBig from "../../assets/background/vector-big.svg";
import VectorSmall from "../../assets/background/vector-small.svg";

import styles from "../../styles/pages/Register.module.scss";

const Register = (): JSX.Element => {
  // const { t } = useTranslation();

  return (
    <>
      <Container className={cn(styles.login__container)}>
        <h1 className={cn(styles.login__heading)}>Создай новый аккаунт</h1>

        <p className={cn(styles.login__description)}>Присоединяйся к сообществу из 518 млн человек!</p>

        <RegisterForm className={cn(styles.login__form)} />
      </Container>

      <VectorBig className={cn(styles.register__vector, styles["register__vector--big"])} />
      <VectorSmall className={cn(styles.register__vector, styles["register__vector--small"])} />
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

export default withAuthLayout(Register, styles.body);
