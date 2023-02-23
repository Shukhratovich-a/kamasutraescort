import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import { SelectItem } from "../../interfaces";

export interface SelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  selectArray: SelectItem[];
  selected?: number;
  setSelected?: (selected: number) => void;
  error?: FieldError;
  placeholder?: string;
}
