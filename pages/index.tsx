import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../layout/Layout";

import { Button, Container, Input } from "../components";

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/auth/login");
  }, [router]);

  return (
    <Container>
      <Button appearance="primary">{t("button:enter")}</Button>
      <Button appearance="secondary">{t("button:enter")}</Button>
      <Button appearance="red">{t("button:enter")}</Button>

      <Input appearance="user" placeholder={t("input:username") || ""} />
      <Input appearance="mail" placeholder={t("input:mail") || ""} />
      <Input appearance="password" placeholder={t("input:password") || ""} />
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
