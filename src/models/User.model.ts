import { Collection, Schema, model } from "mongoose";
import { IUser } from "../types/user.type";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 3, maxlength: 1024, required: true },
    isActive: { type: Boolean, default: true },
    permissions: { type: [String], default: [] },
  },
  {
    timestamps: true,
    collection: "users",
  }
);


export const User = model<IUser>("User", userSchema);
