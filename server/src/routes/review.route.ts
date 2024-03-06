import { createReview, getProductReviews } from '@/controllers';
import { verifyJwt } from '@/middleware';
import { Router } from 'express';

const router = Router();

router
  .route('/:productId')
  .get(getProductReviews)
  .post(verifyJwt, createReview);

export default router;
