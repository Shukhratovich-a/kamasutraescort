import React, { FunctionComponent } from "react";
import { useSession } from "next-auth/react";
import cn from "classnames";

import { LayoutProps } from "./Layout.props";

import { Header } from "./Header/Header.comonent";
import { AuthHeader } from "./AuthHeader/AuthHeader.comonent";
import { Footer } from "./Footer/Footer.component";

import { Container, ProfileMenu, Vectors } from "../components";

import styles from "./Layout.module.scss";

const Layout = ({ children, className }: LayoutProps): JSX.Element => {
  const { data: session } = useSession();

  return (
    <div className={cn(styles.wrapper, className)}>
      {session?.token ? <Header /> : <AuthHeader />}

      <main className={cn(styles.main)}>{children}</main>

      <Footer className={cn(styles.footer)} />

      <Vectors />
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

const ProfileLayout = ({ children, className }: LayoutProps): JSX.Element => {
  const { data: session } = useSession();

  return (
    <div className={cn(styles.wrapper, className)}>
      {session?.token ? <Header /> : <AuthHeader />}

      <main className={cn(styles.main)}>
        <Container>
          <ProfileMenu />
          {children}
        </Container>
      </main>

      <Footer className={cn(styles.footer)} />

      <Vectors />
    </div>
  );
};

export const withProfileLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>,
  className?: string
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <ProfileLayout className={className}>
        <Component {...props} />
      </ProfileLayout>
    );
  };
};
