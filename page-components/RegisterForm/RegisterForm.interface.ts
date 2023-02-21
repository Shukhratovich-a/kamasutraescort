import { GenderEnum } from "../../interfaces";

export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  gender: GenderEnum;
  birthDate: Date;
}
