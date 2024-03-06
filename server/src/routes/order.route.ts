import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '@/controllers';
import { verifyJwt } from '@/middleware';
import { verifyAdmin } from '@/middleware/auth.middleware';
import { Router } from 'express';

const router = Router();

router.use(verifyJwt);

router.route('/').post(addOrderItems);
router.route('/myorders').get(getMyOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/pay').put(updateOrderToPaid);

// admin routes
router.use(verifyAdmin);

router.route('/').get(getOrders);
router.route('/:id/deliver').put(updateOrderToDelivered);

export default router;
