import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "../layout/Layout";

import { Container } from "../components";

const Messages = (): JSX.Element => {
  const { query } = useRouter();

  return <Container>{query.type}</Container>;
};

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext<ParsedUrlQuery>) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Messages);
