import { TypeEnum } from "../../interfaces";

export interface IAdvertisementEditor {
  advName: string;

  birthDate: Date;

  type: TypeEnum;

  region: number;

  fullname?: string;

  height?: number;

  weight?: number;

  goal?: number;

  hairColor?: number;

  eyeColor?: number;

  about?: string;

  image?: {
    first?: File;
    second?: File;
    third?: File;
    fourth?: File;
  };
}
