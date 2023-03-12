import cn from "classnames";

import { ContainerProps } from "./Container.props";

import styles from "./Container.module.scss";

export const Container = ({ className, children, ...props }: ContainerProps): JSX.Element => {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  );
};
