import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import { GenderEnum } from "../../interfaces";

export interface GenderSelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  gender: GenderEnum;
  isEditable: boolean;
  setGender?: (gender: GenderEnum) => void;
  error?: FieldError;
}
