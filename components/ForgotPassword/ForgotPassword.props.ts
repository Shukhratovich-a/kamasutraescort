import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ForgotPasswordProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen?: boolean;
}
