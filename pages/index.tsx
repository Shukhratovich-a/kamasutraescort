import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import { getServerSession, Session } from "next-auth";
import axios from "axios";
import cn from "classnames";

import { authOptions } from "./api/auth/[...nextauth]";

import { UserInterface } from "../interfaces";
import { API } from "../helpers";

import { withLayout } from "../layout/Layout";

import { AuthHomePage } from "../page-components";
import { Container } from "../components";

import styles from "../styles/pages/Home.module.scss";

const Home = ({ session, men, women, others }: HomePageProps): JSX.Element => {
  return (
    <Container className={cn(styles.container)}>
      {session ? <AuthHomePage session={session} men={men} women={women} others={others} /> : <>Not token</>}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  req,
  res,
  locale,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.token) {
    return {
      props: {
        session,
        ...(await serverSideTranslations(String(locale))),
      },
    };
  }

  const { data: men } = await axios.get(API.user.getByGender + "/female");
  const { data: women } = await axios.get(API.user.getByGender + "/male");
  const { data: others } = await axios.get(API.user.getByGender + "/shemale");

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
  session: Session | null;
  men?: UserInterface[];
  women?: UserInterface[];
  others?: UserInterface[];
}
