import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Session } from "next-auth";

import { UserInterface } from "../../interfaces";

export interface AuthHomePageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  session?: Session;
  men?: UserInterface[];
  women?: UserInterface[];
  others?: UserInterface[];
}
