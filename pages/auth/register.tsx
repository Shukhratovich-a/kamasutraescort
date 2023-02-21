import cn from "classnames";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../../layout/Layout";

import { Container } from "../../components";
import { RegisterForm } from "../../page-components";

import styles from "../../styles/pages/Register.module.scss";

const Register = (): JSX.Element => {
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

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withLayout(Register, styles.body);
