import { Request } from "express";
import { UserRole } from "./user.types.js";

export interface JwtPayload {
  userId: string;
  role?: UserRole;
  iat?: number;
  exp?: number;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  photoUrl?: string;
}

export interface AuthenticatedRequest extends Request {
  id?: string;
  user?: AuthenticatedUser;
}
