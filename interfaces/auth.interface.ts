import { JWT } from "next-auth/jwt";

import { UserInterface } from "./user.interface";

export interface AuthResponceInterface {
  status: number;
  message: string;
  accessToken: JWT;
  user: UserInterface;
}

export interface CheckUserInterface {
  token: string;
}
