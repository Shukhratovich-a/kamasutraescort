import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

import { ProfileLayout, withLayout } from "../../../../layout/Layout";
import { AdvertisementsInfo } from "../../../../page-components";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]";
import axios from "axios";
import { API } from "../../../../helpers";
import { AdvertismentInterface } from "../../../../interfaces/advertisments.interface";

const Account = ({ advertisments }: AdvertismentPageProps): JSX.Element => {
  return (
    <ProfileLayout>
      <AdvertisementsInfo advertisements={advertisments} />
    </ProfileLayout>
  );
};

export const getServerSideProps: GetServerSideProps<AdvertismentPageProps> = async ({
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

  const { data: advertisments } = await axios.get(API.advertisement.getByUsername(session.user.username));

  return {
    props: {
      advertisments,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Account);

interface AdvertismentPageProps extends Record<string, unknown> {
  advertisments: AdvertismentInterface[];
}
