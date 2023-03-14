import { DetailedHTMLProps, HTMLAttributes } from "react";

import { AdvertismentInterface } from "../../interfaces";

export interface AdvertisementInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  advertisement: AdvertismentInterface;
}
