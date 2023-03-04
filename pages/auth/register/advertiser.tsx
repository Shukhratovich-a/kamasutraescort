import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import axios from "axios";

import { API } from "../../../helpers";
import { SelectItem } from "../../../interfaces";

import { withLayout } from "../../../layout/Layout";

import { RegisterForm } from "../../../page-components";
import { Container } from "../../../components";

import styles from "../../../styles/pages/Register.module.scss";

export const Advertiser = ({ regions }: AdvertiserPageProps) => {
  const { t } = useTranslation();

  return (
    <Container className={cn(styles.register__container)}>
      <h1 className={cn(styles.register__heading)}>{t("auth:register-heading")}</h1>

      <p className={cn(styles.register__description)}>{t("auth:register-description")}</p>

      <RegisterForm className={cn(styles.register__form)} regions={regions} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<AdvertiserPageProps> = async ({
  locale,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  const { data: regions } = await axios.get<SelectItem[]>(API.regions.getAll);

  return {
    props: {
      regions,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Advertiser, styles.body);

interface AdvertiserPageProps extends Record<string, unknown> {
  regions: SelectItem[];
}
