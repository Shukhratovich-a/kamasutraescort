import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../layout/Layout";

import { Button, Container } from "../components";

const Home = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container>
      <Button appearance="primary">{t("button:enter")}</Button>
      <Button appearance="secondary">{t("button:enter")}</Button>
      <Button appearance="red">{t("button:enter")}</Button>
    </Container>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default withLayout(Home);
