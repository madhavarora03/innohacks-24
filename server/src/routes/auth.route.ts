import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from '@/controllers';
import { verifyJwt } from '@/middleware';
import { Router } from 'express';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/logout').post(verifyJwt, logoutUser);

export default router;
