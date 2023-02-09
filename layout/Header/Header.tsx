import cn from "classnames";

import { HeaderProps } from "./Header.props";

import { Container } from "../../components";

import styles from "./Header.module.scss";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header className={cn(styles.header, className)} {...props}>
      <Container>Header</Container>
    </header>
  );
};
