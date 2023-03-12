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

const Home = ({ session, men, women, others }: HomePageProps): JSX.Element => {
  console.log(men);
  console.log(women);
  console.log(others);

  return <AuthHomePage session={session} men={men} women={women} others={others} />;
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

  const { data: men } = await axios.get(API.advertisement.getByType(TypeEnum.Male));
  const { data: women } = await axios.get(API.advertisement.getByType(TypeEnum.Female));
  const { data: others } = await axios.get(API.advertisement.getByType(TypeEnum.Shemale));

  return {
    props: {
      men,
      women,
      others,
      session,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Home);

export interface HomePageProps extends Record<string, unknown> {
  session: Session;
  men?: AdvertismentInterface[];
  women?: AdvertismentInterface[];
  others?: AdvertismentInterface[];
}
