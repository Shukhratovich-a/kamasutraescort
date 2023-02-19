import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

import { API } from "../helpers";

import { AuthResponceInterface } from "../interfaces";

import { withLayout } from "../layout/Layout";

import { Container } from "../components";

const Home = (): JSX.Element => {
  const { i18n } = useTranslation();

  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    try {
      (async () => {
        if (session?.token) {
          const { data } = await axios.post<AuthResponceInterface>(
            API.auth.checkUser,
            {},
            { headers: { Authorization: `${session.token}` } }
          );

          if (data.status !== 200) {
            signOut();
            return router.push("/auth/login", "/auth/login", { locale: i18n.language });
          }
        }
      })();
    } catch {
      signOut();
    }
  });

  return <Container>{session?.token ? <>wia</> : <>no a</>}</Container>;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default withLayout(Home);
