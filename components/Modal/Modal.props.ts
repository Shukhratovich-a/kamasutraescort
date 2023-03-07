import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  border?: 50 | 20;
  isOpen?: boolean;
  children: ReactNode;
  setIsOpen?: (isOpen: boolean) => void;
}
