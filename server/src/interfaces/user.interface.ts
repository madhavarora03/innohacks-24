import { Document, Model } from 'mongoose';

export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;

  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends User, Document {}

export interface UserMethods {
  matchPassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export interface UserModel extends Model<User, UserDocument, UserMethods> {}
