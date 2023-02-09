import cn from "classnames";

import { ContainerProps } from "./Container.props";

import styles from "./Container.module.scss";

export const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  );
};
