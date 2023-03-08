import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ImageSelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  url?: string;

  image?: File;
  setImage?: (image: File) => void;

  border?: 50 | 30;
}
