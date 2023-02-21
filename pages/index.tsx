import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

import { API } from "../helpers";

import { AuthResponceInterface } from "../interfaces";

import { withLayout } from "../layout/Layout";

import { Container } from "../components";

const Home = ({ session }: HomePageProps): JSX.Element => {
  const { i18n } = useTranslation();
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      try {
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
      } catch {
        signOut();
      }
    })();
  });

  return <Container>{session?.token ? <>With token</> : <>Not token</>}</Container>;
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const session = await getSession(ctx);

  return {
    props: {
      session: session,
      ...(await serverSideTranslations(String(ctx.locale))),
    },
  };
};

export default withLayout(Home);

export interface HomePageProps extends Record<string, unknown> {
  session: Session | null;
}
