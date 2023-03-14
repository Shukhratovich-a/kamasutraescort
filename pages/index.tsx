import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import { getServerSession, Session } from "next-auth";
import axios from "axios";

import { authOptions } from "./api/auth/[...nextauth]";

import { AdvertismentInterface, TypeEnum } from "../interfaces";
import { API } from "../helpers";

import { withLayout } from "../layout/Layout";

import { AuthHomePage } from "../page-components";

const Home = ({ session, man, woman, shemale, massage }: HomePageProps): JSX.Element => {
  return <AuthHomePage session={session} man={man} woman={woman} shemale={shemale} massage={massage} />;
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  req,
  res,
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

  // return {
  //   props: {
  //     session,
  //     ...(await serverSideTranslations(String(locale))),
  //   },
  // };

  const { data: man } = await axios.get(API.advertisement.getByType(TypeEnum.Male));
  const { data: woman } = await axios.get(API.advertisement.getByType(TypeEnum.Female));
  const { data: shemale } = await axios.get(API.advertisement.getByType(TypeEnum.Shemale));
  const { data: massage } = await axios.get(API.advertisement.getByType(TypeEnum.Massage));

  return {
    props: {
      man,
      woman,
      shemale,
      massage,
      session,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Home);

export interface HomePageProps extends Record<string, unknown> {
  session: Session;
  man?: AdvertismentInterface[];
  woman?: AdvertismentInterface[];
  shemale?: AdvertismentInterface[];
  massage?: AdvertismentInterface[];
}
