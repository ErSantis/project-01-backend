import jwt from "jsonwebtoken";
import { IUser } from "../types/user.type";


export const generateToken = (user: IUser): string => {
  const payload = {
    id: user._id,
    email: user.email,
    permissions: user.permissions || [],
  };

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: (process.env.JWT_EXPIRES_IN ||
      "1d") as jwt.SignOptions["expiresIn"],
  });
};
