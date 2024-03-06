import { Router } from 'express';
import authRoute from './auth.route';
import healthCheckRoute from './healthcheck.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/healthcheck', healthCheckRoute);

export default router;
