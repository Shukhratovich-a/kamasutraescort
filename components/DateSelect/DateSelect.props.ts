import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DateSelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  date?: Date;
  setDate?: (date: Date) => void;
}
