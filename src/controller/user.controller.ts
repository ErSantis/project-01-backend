import { Request, Response } from "express";
import { UserActions } from "../services/user.service";
import { IUser, IUserLogin, IUserUpdate } from "../types/user.type";

export class UserController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body as IUser;

    if (!name || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    try {
      const user = await UserActions.create(req.body as IUser);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const result = await UserActions.login({ email, password });

      if (!result) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      res.json(result);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body as IUserUpdate;

    if (!id || !updates) {
      res.status(400).json({ error: "ID and updates are required" });
      return;
    }

    try {
      const user = await UserActions.update(id, updates);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async disable(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "ID is required" });
      return;
    }

    try {
      await UserActions.disable(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
