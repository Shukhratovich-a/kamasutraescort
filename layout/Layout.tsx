import React, { FunctionComponent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import cn from "classnames";

import { LayoutProps } from "./Layout.props";

import { Header } from "./Header/Header.comonent";
import { AuthHeader } from "./AuthHeader/AuthHeader.comonent";
import { ProfileMenu } from "./ProfileMenu/ProfileMenu.component";
import { Footer } from "./Footer/Footer.component";

import { Container } from "../components";

import styles from "./Layout.module.scss";

const Layout = ({ children, className }: LayoutProps): JSX.Element => {
  const { data: session } = useSession();
  const { asPath } = useRouter();

  return session ? (
    <div className={cn(styles.wrapper, className)}>
      {session && !asPath.startsWith("/auth") ? <Header className={cn(styles.header)} /> : <AuthHeader />}

      <main
        className={cn(styles.main, {
          [styles["main--auth"]]: !asPath.startsWith("/auth"),
        })}
      >
        {children}
      </main>

      <Footer
        className={cn(styles.footer, {
          [styles["footer--auth"]]: !asPath.startsWith("/auth"),
        })}
      />
    </div>
  ) : (
    <div className={cn(styles.wrapper, className)}>
      <AuthHeader />

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

export const ProfileLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Container className={cn(styles["wrapper--profile__container"])}>
      <ProfileMenu />
      <div className={cn(styles["wrapper--profile__right"])}>{children}</div>
    </Container>
  );
};
