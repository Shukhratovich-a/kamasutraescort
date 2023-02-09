import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAuthLayout } from "../../layout/Layout";

const Register = (): JSX.Element => {
  return <>Register</>;
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default withAuthLayout(Register);
