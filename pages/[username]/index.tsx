import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession, Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

import { authOptions } from "../api/auth/[...nextauth]";
import { API, selectDefaultKeys } from "../../helpers";

import { AuthResponceInterface, SelectItem, UserInterface } from "../../interfaces";

import { ProfileLayout, withLayout } from "../../layout/Layout";

import { NotFound, UserProfile, ProfileInfo } from "../../page-components";

const Profile = ({ ownProfile, user }: ProfilePageProps): JSX.Element => {
  return ownProfile ? (
    <ProfileLayout>
      <ProfileInfo
        session={ownProfile.session}
        hairs={ownProfile.hairs}
        eyes={ownProfile.eyes}
        regions={ownProfile.regions}
      />
    </ProfileLayout>
  ) : user ? (
    <UserProfile user={user} />
  ) : (
    <NotFound />
  );
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  req,
  res,
  params,
  locale,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: locale === "en" ? `/auth/login` : `/${locale}/auth/login`,
        permanent: true,
      },
    };
  }

  if (!params) {
    return {
      notFound: true,
    };
  }

  if (params.username === session.user.username) {
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
            ownProfile: {
              hairs,
              eyes,
              regions,
              session,
            },
            ...(await serverSideTranslations(String(locale))),
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
  } else {
    try {
      const { data: user } = await axios.get<UserInterface>(API.user.getByUsername + `/${params.username}`);

      if (!user) {
        return { notFound: true };
      }

      return {
        props: {
          user,
          ...(await serverSideTranslations(String(locale))),
        },
      };
    } catch {
      return { notFound: true };
    }
  }
};

export default withLayout(Profile);

export interface OwnProfile {
  session: Session | null;
  hairs: SelectItem[];
  eyes: SelectItem[];
  regions: SelectItem[];
}

export interface ProfilePageProps extends Record<string, unknown> {
  ownProfile?: OwnProfile;
  user?: UserInterface;
}
