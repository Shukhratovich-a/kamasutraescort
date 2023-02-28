import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ImageSelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  firstImage?: string | null;
  secondImage?: string | null;
  thirdImage?: string | null;
  fourthImage?: string | null;
}
