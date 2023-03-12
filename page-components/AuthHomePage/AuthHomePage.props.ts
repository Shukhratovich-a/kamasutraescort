import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Session } from "next-auth";

import { AdvertismentInterface } from "../../interfaces";

export interface AuthHomePageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  session?: Session;
  men?: AdvertismentInterface[];
  women?: AdvertismentInterface[];
  others?: AdvertismentInterface[];
}
