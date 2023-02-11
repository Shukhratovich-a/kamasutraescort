export interface IRegisterForm {
  username: string;
  mail: string;
  password: string;
  gender: "male" | "female" | "massage";
  date: Date;
}
