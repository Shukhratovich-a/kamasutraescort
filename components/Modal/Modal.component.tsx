import React from "react";
import cn from "classnames";

import { ModalProps } from "./Modal.props";

import styles from "./Modal.module.scss";

export const Modal = ({ className, isOpen, setIsOpen, children, border = 20, ...props }: ModalProps): JSX.Element => {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) window.document.body.style.overflow = "hidden";
    else window.document.body.style.overflow = "visible";
  }, [isOpen]);

  const handleClose = () => {
    if (!setIsOpen) return;
    setIsOpen(false);
  };

  return isOpen ? (
    <div className={cn(styles.modal)} {...props}>
      <div className={cn(styles.modal__back)} onClick={handleClose} />

      <div className={cn(styles.modal__inner, styles[`modal__inner--${border}`], className)}>{children}</div>
    </div>
  ) : (
    <></>
  );
};
