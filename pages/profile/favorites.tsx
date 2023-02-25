import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withProfileLayout } from "../../layout/Layout";

import { FavoritesInfo } from "../../page-components";

const Favorites = (): JSX.Element => {
  return <FavoritesInfo />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withProfileLayout(Favorites);
