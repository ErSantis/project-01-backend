import bcrypt from 'bcrypt';
import { IUser } from '../types/user.type';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (user: IUser, password: string): Promise<boolean> => {
  return await bcrypt.compare(password, user.password);
};