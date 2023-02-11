import cn from "classnames";
// import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAuthLayout } from "../../layout/Layout";

import { Container, RegisterForm } from "../../components";

import styles from "../../styles/pages/Register.module.scss";

const Register = (): JSX.Element => {
  // const { t } = useTranslation();

  return (
    <>
      <Container className={cn(styles.register__container)}>
        <h1 className={cn(styles.register__heading)}>Создай новый аккаунт</h1>

        <p className={cn(styles.register__description)}>Присоединяйся к сообществу из 518 млн человек!</p>

        <RegisterForm className={cn(styles.register__form)} />
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

export default withAuthLayout(Register, styles.body);
