import { GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../layout/Layout";

import { Container } from "../components";

const Messages = (): JSX.Element => {
  return <Container>Advertisements</Container>;
};

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext<ParsedUrlQuery>) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Messages);
