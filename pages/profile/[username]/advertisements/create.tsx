import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import { API, selectDefaultKeys } from "../../../../helpers";
import { SelectItem } from "../../../../interfaces";

import { ProfileLayout, withLayout } from "../../../../layout/Layout";
import { AdvertisementEditor } from "../../../../page-components";

const Create = ({ regions, hairs, eyes }: CreatePageProps): JSX.Element => {
  return (
    <ProfileLayout>
      <AdvertisementEditor regions={regions} hairs={hairs} eyes={eyes} />
    </ProfileLayout>
  );
};

export const getServerSideProps: GetServerSideProps<CreatePageProps> = async ({
  locale,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const { data: regions } = await axios.get<SelectItem[]>(API.regions.getAll);

  const { data: hairs } = await axios.get<SelectItem[]>(API.hairs.getAll);
  const { data: eyes } = await axios.get<SelectItem[]>(API.eyes.getAll);

  hairs.unshift(selectDefaultKeys);
  eyes.unshift(selectDefaultKeys);

  return {
    props: {
      regions,
      hairs,
      eyes,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Create);

interface CreatePageProps extends Record<string, unknown> {
  regions: SelectItem[];
  hairs: SelectItem[];
  eyes: SelectItem[];
}
