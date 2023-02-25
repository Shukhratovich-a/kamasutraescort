import React from "react";
import cn from "classnames";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SelectItem } from "../../interfaces";
import { API } from "../../helpers";

import { withLayout } from "../../layout/Layout";

import { Container } from "../../components";
import { RegisterForm } from "../../page-components";

import styles from "../../styles/pages/Register.module.scss";

const Register = ({ regions }: RegisterPageProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Container className={cn(styles.register__container)}>
        <h1 className={cn(styles.register__heading)}>{t("auth:register-heading")}</h1>

        <p className={cn(styles.register__description)}>{t("auth:register-description")}</p>

        <RegisterForm className={cn(styles.register__form)} regions={regions} />
      </Container>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const { data: regions } = await axios.get<SelectItem[]>(API.regions.getAll);

  return {
    props: {
      regions: regions,
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withLayout(Register, styles.body);

export interface RegisterPageProps extends Record<string, unknown> {
  regions: SelectItem[];
}
