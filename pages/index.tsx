import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import axios from "axios";

import { API } from "../helpers";

import { AuthResponceInterface } from "../interfaces";

import { withLayout } from "../layout/Layout";

const Home = (): JSX.Element => {
  const { i18n } = useTranslation();

  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      if (session?.token) {
        const { data } = await axios.post<AuthResponceInterface>(
          API.auth.checkUser,
          {},
          { headers: { Authorization: `${session.token}` } }
        );

        if (data.status !== 200) {
          return router.push("/auth/login", "/auth/login", { locale: i18n.language });
        }
      }
    })();
  });

  return session?.token ? <>wia</> : <>no a</>;
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default withLayout(Home);
