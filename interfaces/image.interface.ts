import { UserInterface } from "./user.interface";

export interface AvatarInterface {
  id: number;
  filename: string;
  user: UserInterface;
  createdAt: Date;
  updatedAt: Date;
}
