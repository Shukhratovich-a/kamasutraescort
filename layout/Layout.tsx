import { FunctionComponent } from "react";
import { useRouter } from "next/router";

import cn from "classnames";
import { motion } from "framer-motion";

import { LayoutProps } from "./Layout.props";

import { leftBig, leftMedium, leftSmall, rightBig, rightMedium, rightSmall } from "../helpers";

import { Header } from "./Header/Header.comonent";
import { AuthHeader } from "./AuthHeader/AuthHeader.comonent";
import { Footer } from "./Footer/Footer";

import VectorLeft from "../assets/background/vector-big.svg";
import VectorRight from "../assets/background/vector-small.svg";

import styles from "./Layout.module.scss";
import useMediaQuery from "../hooks/useMediaQuery";

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
  const router = useRouter();

  const { pathname } = router;

  const isMedium = useMediaQuery("(max-width: 1000px)");
  const isSmall = useMediaQuery("(max-width: 650px)");

  const variantsLeft = isSmall ? leftSmall : isMedium ? leftMedium : leftBig;
  const variantsRight = isSmall ? rightSmall : isMedium ? rightMedium : rightBig;

  return (
    <>
      <div className={cn(styles.wrapper, className)}>
        <AuthHeader className={cn(styles.header)} />

        <main className={cn(styles.main)}>{children}</main>

        <Footer className={cn(styles.footer)} />

        <motion.svg
          className={cn(styles.background)}
          variants={variantsLeft}
          animate={pathname === "/auth/login" ? "login" : "register"}
          initial={pathname === "/auth/login" ? "register" : "login"}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <VectorLeft />
        </motion.svg>

        <motion.svg
          className={cn(styles.background)}
          variants={variantsRight}
          animate={pathname === "/auth/login" ? "login" : "register"}
          initial={pathname === "/auth/login" ? "register" : "login"}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <VectorRight />
        </motion.svg>
      </div>
    </>
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
