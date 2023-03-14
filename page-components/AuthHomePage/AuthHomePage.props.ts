import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Session } from "next-auth";

import { AdvertismentInterface } from "../../interfaces";

export interface AuthHomePageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  session?: Session;
  man?: AdvertismentInterface[];
  woman?: AdvertismentInterface[];
  shemale?: AdvertismentInterface[];
  massage?: AdvertismentInterface[];
}
