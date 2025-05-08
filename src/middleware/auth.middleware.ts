import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        permissions: string[];
      };
    }
  }
}

// Middleware to authenticate requests
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }

  try {
    // Verify token and decode user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // Find active user in the database
    const user = await User.findOne({ _id: decoded.id, isActive: true });

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    // Attach user information to the request object
    req.user = {
      _id: user._id.toString(),
      email: user.email,
      permissions: user.permissions,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
