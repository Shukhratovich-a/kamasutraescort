import cn from "classnames";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAuthLayout } from "../../layout/Layout";

import VectorBig from "../../assets/background/vector-big.svg";
import VectorSmall from "../../assets/background/vector-small.svg";

import styles from "../../styles/pages/Register.module.scss";

const Register = (): JSX.Element => {
  return (
    <>
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
