import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from '@/controllers';
import { verifyJwt } from '@/middleware';
import { verifyAdmin } from '@/middleware/auth.middleware';
import { Router } from 'express';

const router = Router();

router.route('/').get(getProducts);
router.route('/top').get(getTopProducts);
router.route('/:productId').get(getProductById);

// admin routes
router.use(verifyJwt, verifyAdmin);

router.route('/').post(createProduct);
router.route('/:productId').patch(updateProduct).delete(deleteProduct);

export default router;
