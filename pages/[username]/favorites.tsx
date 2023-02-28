import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { ProfileLayout, withLayout } from "../../layout/Layout";

import { FavoritesInfo } from "../../page-components";

const Favorites = (): JSX.Element => {
  return (
    <ProfileLayout>
      <FavoritesInfo />
    </ProfileLayout>
  );
};

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext<ParsedUrlQuery>) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Favorites);
