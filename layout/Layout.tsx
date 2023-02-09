import { FunctionComponent } from "react";

import cn from "classnames";

import { LayoutProps } from "./Layout.props";

import { Header } from "./Header/Header.comonent";
import { AuthHeader } from "./AuthHeader/AuthHeader.comonent";
import { Footer } from "./Footer/Footer";

import styles from "./Layout.module.scss";

const Layout = ({ children, className }: LayoutProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <Header className={cn(styles.header)} />

      <main className={cn(styles.main)}>{children}</main>

      <Footer className={cn(styles.footer)} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>, className?: string) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout className={className}>
        <Component {...props} />
      </Layout>
    );
  };
};

const AuthLayout = ({ children, className }: LayoutProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <AuthHeader className={cn(styles.header)} />

      <main className={cn(styles.main)}>{children}</main>

      <Footer className={cn(styles.footer)} />
    </div>
  );
};

export const withAuthLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>,
  className?: string
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AuthLayout className={className}>
        <Component {...props} />
      </AuthLayout>
    );
  };
};
