import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withProfileLayout } from "../../layout/Layout";

const Profile = ({ session }: { session: object }): JSX.Element => {
  const router = useRouter();
  const { i18n } = useTranslation();

  React.useEffect(() => {
    if (!session) {
      router.push("/", "/", { locale: i18n.language });
    }
  });

  return <>dfsf</>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  return {
    props: {
      session: session,
      ...(await serverSideTranslations(String(ctx.locale))),
    },
  };
};

export default withProfileLayout(Profile);
