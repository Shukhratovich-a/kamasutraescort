import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession, Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

import { authOptions } from "../../api/auth/[...nextauth]";
import { API } from "../../../helpers";

import { AuthResponceInterface, SelectItem, UserInterface } from "../../../interfaces";

import { ProfileLayout, withLayout } from "../../../layout/Layout";

import { NotFound, UserProfile, ProfileEditor } from "../../../page-components";

const Profile = ({ ownProfile, user }: ProfilePageProps): JSX.Element => {
  return ownProfile ? (
    <ProfileLayout>
      <ProfileEditor session={ownProfile.session} regions={ownProfile.regions} />
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
        const { data: regions } = await axios.get(API.regions.getAll);

        return await {
          props: {
            ownProfile: {
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
  regions: SelectItem[];
}

export interface ProfilePageProps extends Record<string, unknown> {
  ownProfile?: OwnProfile;
  user?: UserInterface;
}
