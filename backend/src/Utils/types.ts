import { Request } from "express";

export type UserObj = {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
};

export interface RequestWithUser extends Request {
  user?: UserObj;
}

export enum Roles {
  ADMIN = "admin",
  CUSTOMER = "customer",
}