import { DetailedHTMLProps, HTMLAttributes } from "react";

import { UserInterface } from "../../interfaces";

export interface UserProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: UserInterface;
  type?: "favorite" | "none";
}
