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
import { AuthResponceInterface, SelectItem } from "../../interfaces";
import { authOptions } from "../api/auth/[...nextauth]";

const Profile = ({ session, hairs, eyes }: ProfilePageProps): JSX.Element => {
  const { data: s } = useSession({ required: true });

  return <ProfileInfo session={s} hairs={hairs} eyes={eyes} />;
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
      const { data: user } = await axios.patch<AuthResponceInterface>(
        API.auth.checkUser,
        {},
        { headers: { Authorization: JSON.stringify(session?.token) } }
      );

      if (user.status === 200) {
        const { data: hairs } = await axios.get<SelectItem[]>("http://localhost:3001/api/hairs");
        const { data: eyes } = await axios.get<SelectItem[]>("http://localhost:3001/api/eye-color");

        return await {
          props: {
            hairs,
            eyes,
            session,
            ...(await serverSideTranslations(String(ctx.locale))),
          },
        };
      } else {
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
  hairs: SelectItem[];
  eyes: SelectItem[];
}
