import { DetailedHTMLProps, HTMLAttributes } from "react";

import { AdvertismentInterface } from "../../interfaces/advertisments.interface";

export interface AdvetisementsInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  advertisements: AdvertismentInterface[];
}
