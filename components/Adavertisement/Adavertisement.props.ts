import { DetailedHTMLProps, HTMLAttributes } from "react";

import { AdvertismentInterface } from "../../interfaces";

export interface AdavertisementProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  adavertisement: AdvertismentInterface;
  type?: "favorite" | "none";
}
