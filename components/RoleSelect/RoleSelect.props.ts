import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface RoleSelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen?: boolean;
}
