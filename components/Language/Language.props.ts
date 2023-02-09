import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LanguageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  language: string;
  languages?: string[];
}
