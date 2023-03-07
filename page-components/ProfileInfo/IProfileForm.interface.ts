export interface IProfileForm {
  id?: number;
  username: string;
  password: string;
  email: string;
  region: number;
  birthDate: Date;

  fullname?: string;
  height?: number;
  weight?: number;
  about?: string;
  goal?: string;
  hairColor?: number;
  eyeColor?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
