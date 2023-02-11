import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAuthLayout } from "../layout/Layout";

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

export default withAuthLayout(Support);
