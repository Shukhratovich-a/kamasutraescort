import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { ProfileInfo } from "../../page-components/ProfileInfo/ProfileInfo.component";

import { withProfileLayout } from "../../layout/Layout";

const Profile = ({ session }: ProfilePageProps): JSX.Element => {
  const router = useRouter();
  const { i18n } = useTranslation();

  React.useEffect(() => {
    if (!session) {
      router.push("/", "/", { locale: i18n.language });
    }
  });

  return <ProfileInfo session={session} />;
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
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

export default withProfileLayout(Profile);

export interface ProfilePageProps extends Record<string, unknown> {
  session: Session | null;
}
