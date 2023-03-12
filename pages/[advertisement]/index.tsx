import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession, Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { authOptions } from "../api/auth/[...nextauth]";
import { API } from "../../helpers";

import { AdvertismentInterface } from "../../interfaces";

import { withLayout } from "../../layout/Layout";
import { AdvertisementInfo } from "../../page-components";
import { Container } from "../../components";

const Advertisement = ({ advertisement }: AdvertisementPageProps): JSX.Element => {
  return (
    <Container>
      <AdvertisementInfo advertisement={advertisement} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<AdvertisementPageProps> = async ({
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

  const { data: advertisement } = await axios.get(API.advertisement.getBySearchName(String(params.advertisement)));

  if (!advertisement) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session,
      advertisement,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Advertisement);

interface AdvertisementPageProps extends Record<string, unknown> {
  session: Session;
  advertisement: AdvertismentInterface;
}
