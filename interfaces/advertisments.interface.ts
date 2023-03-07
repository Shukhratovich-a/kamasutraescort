export interface AdvertismentInterface {
  id: number;

  searchName: string;

  advName: string;

  birthDate: Date;

  type: TypeEnum;

  fullname?: string;

  height?: number;

  weight?: number;

  about?: string;

  goal?: number;

  hairColor?: number;

  eyeColor?: number;

  createdAt: Date;
  updatedAt: Date;
}

export enum TypeEnum {
  Male = "male",
  Female = "female",
  Shemale = "shemale",
  Massage = "massage",
}
