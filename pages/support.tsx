import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../layout/Layout";

import { Container } from "../components";

const Support = (): JSX.Element => {
  return <Container>Support</Container>;
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default withLayout(Support);
