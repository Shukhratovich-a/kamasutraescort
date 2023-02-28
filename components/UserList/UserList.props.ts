import { DetailedHTMLProps, HTMLAttributes } from "react";

import { UserInterface } from "../../interfaces";

export interface UserListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  users: UserInterface[];
  heading: string;
}
