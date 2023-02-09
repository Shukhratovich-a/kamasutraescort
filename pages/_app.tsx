import React from "react";
import Head from "next/head";

import { appWithTranslation } from "next-i18next";

import { AppProps } from "next/app";

import "../utils/i18n";

import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Merit</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default appWithTranslation(MyApp);
