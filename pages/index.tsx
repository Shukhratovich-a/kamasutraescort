import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";

import { withLayout } from "../layout/Layout";

import { Container } from "../components";

const Home = (): JSX.Element => {
  const { data: session } = useSession();

  return <Container>{session?.token ? <>With token</> : <>Not token</>}</Container>;
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withLayout(Home);
