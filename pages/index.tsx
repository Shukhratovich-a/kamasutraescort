import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";

import { withLayout } from "../layout/Layout";

import { Container, DateSelect } from "../components";

const Home = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <Container>
      {session?.token ? (
        <>
          <DateSelect date={new Date(2000, 1, 1)} />
        </>
      ) : (
        <>Not token</>
      )}
    </Container>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withLayout(Home);
