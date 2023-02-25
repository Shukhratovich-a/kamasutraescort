import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withProfileLayout } from "../../layout/Layout";
import { AccountInfo } from "../../page-components";

const Account = (): JSX.Element => {
  return <AccountInfo />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withProfileLayout(Account);
