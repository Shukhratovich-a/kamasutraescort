export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  gender: "male" | "female" | "massage";
  birthDate: Date;
}
