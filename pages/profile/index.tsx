import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { getServerSession, Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { ProfileInfo } from "../../page-components/ProfileInfo/ProfileInfo.component";

import { withProfileLayout } from "../../layout/Layout";
import axios from "axios";
import { API } from "../../helpers";
import { AuthResponceInterface } from "../../interfaces";
import { authOptions } from "../api/auth/[...nextauth]";

const Profile = ({ session }: ProfilePageProps): JSX.Element => {
  const { data: s } = useSession({ required: true });

  return <ProfileInfo session={s} />;
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: true,
      },
    };
  } else {
    try {
      const { data } = await axios.patch<AuthResponceInterface>(
        API.auth.checkUser,
        {},
        { headers: { Authorization: JSON.stringify(session?.token) } }
      );

      if (data.status === 200)
        return await {
          props: {
            session,
            ...(await serverSideTranslations(String(ctx.locale))),
          },
        };
      else {
        return { notFound: true };
      }
    } catch {
      return { notFound: true };
    }
  }
};

export default withProfileLayout(Profile);

export interface ProfilePageProps extends Record<string, unknown> {
  session: Session | null;
  // isUser: boolean;
}
