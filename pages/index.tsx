import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../layout/Layout";

import { Container } from "../components";

const Home = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <button onClick={() => i18n.changeLanguage("ru")}>ru</button>
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
      <div>{t("hello-world")}</div>
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
