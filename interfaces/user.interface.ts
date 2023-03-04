import { AvatarInterface } from "./image.interface";
import { SelectItem } from "./select.interface";

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  role: RoleEnum;
  birthDate: Date;
  region: SelectItem;
  avatar: AvatarInterface | null;

  createdAt: Date;
  updatedAt: Date;
}

export enum RoleEnum {
  User = "user",
  Advertiser = "advertiser",
}

export enum GenderEnum {
  Male = "male",
  Female = "female",
}
