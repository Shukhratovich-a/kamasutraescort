export interface UserInterface {
  id?: number;
  username?: string;
  email?: string;
  birthDate?: Date;
  gender?: "male" | "female";
  createdAt?: Date;
  updatedAt?: Date;
}

export enum GenderEnum {
  Male = "male",
  Female = "female",
}
