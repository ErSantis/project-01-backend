import { Request, Response, NextFunction } from "express";

// Middleware to check if the user has the required permission
export const authorize = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Ensure user is authenticated and permissions exist
    if (!req.user || !req.user.permissions) {
      res.status(403).json({ error: "Forbidden: No permissions found" });
      return;
    }

    // Check if the user has the required permission
    if (!req.user.permissions.includes(requiredPermission)) {
      res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      return;
    }

    next(); // Proceed to the next middleware or route handler
  };
};
