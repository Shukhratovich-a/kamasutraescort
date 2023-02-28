import React, { FunctionComponent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import cn from "classnames";

import { LayoutProps } from "./Layout.props";

import { Header } from "./Header/Header.comonent";
import { AuthHeader } from "./AuthHeader/AuthHeader.comonent";
import { Footer } from "./Footer/Footer.component";

import { Container } from "../components";
import { ProfileMenu } from "./ProfileMenu/ProfileMenu.component";

import styles from "./Layout.module.scss";

const Layout = ({ children, className }: LayoutProps): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const { asPath } = router;

  return (
    <div className={cn(styles.wrapper, className)}>
      {session?.token && !asPath.startsWith("/auth") ? <Header className={cn(styles.header)} /> : <AuthHeader />}

      <main
        className={cn(styles.main, {
          [styles["main--auth"]]: session?.token,
        })}
      >
        {children}
      </main>

      <Footer
        className={cn(styles.footer, {
          [styles.footer__auth]: asPath.startsWith("/auth"),
        })}
      />
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

export const ProfileLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Container className={cn(styles["wrapper--profile__container"])}>
      <ProfileMenu />
      <div className={cn(styles["wrapper--profile__right"])}>{children}</div>
    </Container>
  );
};
