import { DetailedHTMLProps, FormHTMLAttributes } from "react";

import { SelectItem } from "../../interfaces";

export interface RegisterFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  regions: SelectItem[];
}
