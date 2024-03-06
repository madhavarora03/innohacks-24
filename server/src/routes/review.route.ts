import {
  createReview,
  getProductReviews,
} from '@/controllers/review.controller';
import { verifyJwt } from '@/middleware';
import { Router } from 'express';

const router = Router();

router
  .route('/:productId')
  .get(getProductReviews)
  .post(verifyJwt, createReview);

export default router;
