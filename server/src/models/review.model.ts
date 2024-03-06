import { ReviewDocument, ReviewModel } from '@/interfaces';
import { Schema, model } from 'mongoose';

const reviewSchema = new Schema<ReviewDocument, ReviewModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Review = model<ReviewDocument, ReviewModel>('Review', reviewSchema);

export default Review;
