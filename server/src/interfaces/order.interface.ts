import mongoose, { Document, Model } from 'mongoose';

export interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: string;
  product: mongoose.Types.ObjectId;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}

export interface OrderDocument extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

export interface OrderModel extends Model<OrderDocument> {}
