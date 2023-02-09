import { FunctionComponent } from "react";

import { LayoutProps } from "./Layout.props";

import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

import styles from "./Layout.module.scss";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />

      <main className={styles.main}>{children}</main>

      <Footer className={styles.footer} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
