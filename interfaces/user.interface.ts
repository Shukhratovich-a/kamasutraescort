import { SelectItem } from "./select.interface";

export interface UserInterface {
  id?: number;
  username: string;
  email: string;
  gender: GenderEnum;
  birthDate: Date;
  region: SelectItem;

  fullname?: string;
  height?: number;
  weight?: number;
  about?: string;
  goal?: string;
  hairColor?: SelectItem;
  eyeColor?: SelectItem;

  createdAt?: Date;
  updatedAt?: Date;
}

export enum GenderEnum {
  Male = "male",
  Female = "female",
}
