import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { AuthHeaderProps } from "./AuthHeader.props";

import { Button, Container } from "../../components";

import styles from "./AuthHeader.module.scss";

export const AuthHeader = ({ className, ...props }: AuthHeaderProps): JSX.Element => {
  const router = useRouter();

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Container className={cn(styles.header__container)}>
        <Link className={cn(styles.header__logo)} href={"/"}>
          <span>Kamasutraescort</span>
        </Link>

        <span className={cn(styles.header__text)}>Впервые здесь?</span>

        <Button className={cn(styles.header__link)} appearance="linear-primary">
          <Link href={router.asPath === "/auth/register" ? "/auth/login" : "/auth/register"}>Регистрация</Link>
        </Button>
      </Container>
    </header>
  );
};
