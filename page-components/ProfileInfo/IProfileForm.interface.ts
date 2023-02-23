import { GenderEnum } from "../../interfaces";

export interface IProfileForm {
  id?: number;
  username?: string;
  password: string;
  fullname?: string;
  email?: string;
  birthDate?: Date;
  height?: number;
  weight?: number;
  about?: string;
  goal?: string;
  gender?: GenderEnum;
  hairColor?: number;
  eyeColor?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
