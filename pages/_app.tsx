import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

import "../utils/i18n";

import "../styles/globals.scss";

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Kamasutraescort</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
