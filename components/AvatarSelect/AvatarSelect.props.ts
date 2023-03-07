import { DetailedHTMLProps, HTMLAttributes } from "react";

import { AvatarInterface } from "../../interfaces";

export interface AvatarSelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  avatar?: AvatarInterface | null;
}
