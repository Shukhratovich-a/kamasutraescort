import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Session } from "next-auth";
import { SelectItem } from "../../interfaces";

export interface ProfileEditorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  session: Session | null;
  regions: SelectItem[];
}
