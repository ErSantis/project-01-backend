import { User } from "../models/User.model";
import { IUser, IUserLogin, IUserUpdate } from "../types/user.type";
import { hashPassword, comparePassword } from "../utils/authHelpers";
import { generateToken } from "../utils/auth";

export class UserActions {
  static async create(userData: IUser): Promise<IUser> {
   

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email is already in use");
    }

    const hashedPassword = await hashPassword(userData.password);
    console.log("Hashed password:", hashedPassword); // Debugging line
    const user = new User({ ...userData, password: hashedPassword });
    return await user.save();
  }

  static async login(
    credentials: IUserLogin
  ): Promise<{ user: IUser; token: string } | null> {
    const user = await User.findOne({
      email: credentials.email,
      isActive: true,
    });
    if (!user) return null;

    const isValid = await comparePassword(user, credentials.password);
    if (!isValid) return null;

    const token = generateToken(user.toObject());
    return { user: user.toObject(), token };
  }

  static async update(
    id: string,
    updates: IUserUpdate,
    requester: IUser
  ): Promise<IUser | null> {
    if (
      requester._id !== id &&
      !requester.permissions.includes("update_users")
    ) {
      throw new Error("Unauthorized");
    }

    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }

    return User.findByIdAndUpdate(id, updates, { new: true }).lean();
  }
}
