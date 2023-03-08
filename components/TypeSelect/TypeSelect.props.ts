import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import { TypeEnum } from "../../interfaces";

export interface TypeSelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type?: TypeEnum;
  setType?: (type: TypeEnum) => void;

  isEditable?: boolean;
  error?: FieldError;
}
