import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../layout/Layout";

import { Container } from "../components";

const NotFound = (): JSX.Element => {
  return <Container>NotFound</Container>;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withLayout(NotFound);
