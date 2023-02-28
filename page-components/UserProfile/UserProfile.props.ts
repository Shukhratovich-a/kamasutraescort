import { DetailedHTMLProps, HTMLAttributes } from "react";

import { UserInterface } from "../../interfaces";

export interface UserProfileProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: UserInterface;
}
