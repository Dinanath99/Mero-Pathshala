import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, user: any, message: string): Response => {
  const secretKey = process.env.SECRET_KEY || "secret";
  const token = jwt.sign({ userId: user._id }, secretKey, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
