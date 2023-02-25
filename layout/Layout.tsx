import React, { FunctionComponent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import cn from "classnames";

import { LayoutProps } from "./Layout.props";

import { Header } from "./Header/Header.comonent";
import { AuthHeader } from "./AuthHeader/AuthHeader.comonent";
import { Footer } from "./Footer/Footer.component";

import { Container, Vectors } from "../components";
import { ProfileMenu } from "./ProfileMenu/ProfileMenu.component";

import styles from "./Layout.module.scss";

const Layout = ({ children, className }: LayoutProps): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const { asPath } = router;

  return (
    <div className={cn(styles.wrapper, className)}>
      {session?.token && !asPath.startsWith("/auth") ? <Header /> : <AuthHeader />}

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
  return (
    <Layout className={cn(styles["wrapper--profile"], className)}>
      <Container className={cn(styles["wrapper--profile__container"])}>
        <ProfileMenu />
        <div className={cn(styles["wrapper--profile__right"])}>{children}</div>
      </Container>
    </Layout>
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
