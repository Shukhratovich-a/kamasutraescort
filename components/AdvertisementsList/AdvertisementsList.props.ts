import { DetailedHTMLProps, HTMLAttributes } from "react";

import { AdvertismentInterface } from "../../interfaces";

export interface AdvertisementsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  advertisements: AdvertismentInterface[];
}
