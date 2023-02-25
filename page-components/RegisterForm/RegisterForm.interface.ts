import { GenderEnum } from "../../interfaces";

export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  region: number;
  gender: GenderEnum;
  birthDate: Date;
}
