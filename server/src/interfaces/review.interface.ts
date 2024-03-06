import mongoose, { Document } from 'mongoose';

export interface Review {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  rating: number;
  comment: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReviewDocument extends Review, Document {}

export interface ReviewMethods {}

export interface ReviewModel extends mongoose.Model<ReviewDocument> {}
