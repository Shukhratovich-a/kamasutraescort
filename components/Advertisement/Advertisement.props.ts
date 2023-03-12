import { DetailedHTMLProps, HTMLAttributes } from "react";

import { AdvertismentInterface } from "../../interfaces";

export interface AdvertisementProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  advertisement: AdvertismentInterface;
  type?: "favorite" | "none";
}
