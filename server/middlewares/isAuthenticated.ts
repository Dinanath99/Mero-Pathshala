import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, AuthenticatedUser } from "../types/auth.types.js";

declare global {
  namespace Express {
    interface Request {
      id?: string;
      user?: AuthenticatedUser;
    }
  }
}

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const secretKey = process.env.SECRET_KEY || "secret";
    const decode = jwt.verify(token, secretKey) as JwtPayload;
    if (!decode || !decode.userId) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;
    if (token) {
      const secretKey = process.env.SECRET_KEY || "secret";
      const decode = jwt.verify(token, secretKey) as JwtPayload;
      if (decode && decode.userId) {
        req.id = decode.userId;
      }
    }
  } catch (error) {
    // Treat invalid or expired token as guest session for optional auth
  }
  next();
};

export default isAuthenticated;
