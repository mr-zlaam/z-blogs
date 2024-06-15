import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import { Response } from "express";
export interface PayLoadType {
  uid: string;
  username: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "MODERATOR" | "USER";
}
export const GenerateJWTAccessToken = (payload: PayLoadType, res: Response) => {
  try {
    let accessToken = sign(payload, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return accessToken;
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message || "Internal Server Error while generating tokens",
    });
  }
};
