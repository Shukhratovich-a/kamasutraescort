import { JWT } from "next-auth/jwt";
import { AuthResponceInterface, UserInterface } from "./interfaces";

declare module "next-auth" {
  interface Session {
    user: UserInterface;
    token: JWT;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends AuthResponceInterface {}
}
