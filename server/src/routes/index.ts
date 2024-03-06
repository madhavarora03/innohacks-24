import { Router } from 'express';
import authRoute from './auth.route';
import healthCheckRoute from './healthcheck.route';
import orderRoute from './order.route';
import productRoute from './product.route';
import reviewRoute from './review.route';
import userRoute from './user.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/healthcheck', healthCheckRoute);
router.use('/products', productRoute);
router.use('/reviews', reviewRoute);
router.use('/orders', orderRoute);
router.use('/users', userRoute);

export default router;
