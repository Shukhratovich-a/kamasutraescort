export interface UserInterface {
  id?: number;
  username: string;
  fullname?: string;
  email: string;
  birthDate?: Date;
  height?: number;
  weight?: number;
  about?: string;
  goal?: string;
  gender: GenderEnum;
  hairColor?: number;
  eyeColor?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export enum GenderEnum {
  Male = "male",
  Female = "female",
}
