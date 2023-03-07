import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { ProfileLayout, withLayout } from "../../../../layout/Layout";

const Create = (): JSX.Element => {
  return <ProfileLayout>create</ProfileLayout>;
};

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext<ParsedUrlQuery>) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Create);
