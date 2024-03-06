import mongoose, { Document, Model } from 'mongoose';

export interface Product {
  name: string;
  price: number;
  image: string;
  reviews: mongoose.Types.ObjectId[];
  brand: string;
  category: string;
  description: string;
  rating: number;
  countInStock: number;
  seller: mongoose.Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductDocument extends Product, Document {}

export interface ProductMethods {}

export interface ProductModel
  extends Model<Product, ProductDocument, ProductMethods> {}
