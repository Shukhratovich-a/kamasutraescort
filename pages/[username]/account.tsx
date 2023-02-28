import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

import { ProfileLayout, withLayout } from "../../layout/Layout";
import { AccountInfo } from "../../page-components";

const Account = (): JSX.Element => {
  return (
    <ProfileLayout>
      <AccountInfo />
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

export default withLayout(Account);
