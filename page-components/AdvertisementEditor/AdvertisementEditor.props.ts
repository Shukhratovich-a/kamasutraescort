import { DetailedHTMLProps, HTMLAttributes } from "react";

import { AdvertismentInterface, SelectItem } from "../../interfaces";

export interface AdvertisementEditorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  advertisement?: AdvertismentInterface;

  regions: SelectItem[];
  hairs: SelectItem[];
  eyes: SelectItem[];
}
