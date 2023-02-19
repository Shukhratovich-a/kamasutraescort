import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withProfileLayout } from "../../layout/Layout";

const Favorites = (): JSX.Element => {
  return <>dfsf</>;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withProfileLayout(Favorites);
