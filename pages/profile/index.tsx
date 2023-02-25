import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession, Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { ProfileInfo } from "../../page-components/ProfileInfo/ProfileInfo.component";

import { withProfileLayout } from "../../layout/Layout";
import axios from "axios";
import { API, selectDefaultKeys } from "../../helpers";
import { AuthResponceInterface, SelectItem } from "../../interfaces";
import { authOptions } from "../api/auth/[...nextauth]";

const Profile = ({ session, hairs, eyes, regions }: ProfilePageProps): JSX.Element => {
  return <ProfileInfo session={session} hairs={hairs} eyes={eyes} regions={regions} />;
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
        const { data: hairs } = await axios.get<SelectItem[]>(API.hairs.getAll);
        const { data: eyes } = await axios.get<SelectItem[]>(API.eyes.getAll);
        const { data: regions } = await axios.get(API.regions.getAll);

        hairs.unshift({
          ...selectDefaultKeys,
        });
        eyes.unshift({
          ...selectDefaultKeys,
        });

        return await {
          props: {
            hairs,
            eyes,
            regions,
            session,
            ...(await serverSideTranslations(String(ctx.locale))),
          },
        };
      } else {
        return {
          redirect: {
            destination: "/auth/login",
            permanent: true,
          },
        };
      }
    } catch {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: true,
        },
      };
    }
  }
};

export default withProfileLayout(Profile);

export interface ProfilePageProps extends Record<string, unknown> {
  session: Session | null;
  hairs: SelectItem[];
  eyes: SelectItem[];
  regions: SelectItem[];
}
