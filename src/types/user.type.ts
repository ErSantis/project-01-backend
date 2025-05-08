export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  permissions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  permissions?: string[];
}
