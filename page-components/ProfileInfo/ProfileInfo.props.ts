import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Session } from "next-auth";

export interface ProfileInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  session: Session | null;
}
