import { deleteUser, getUserById, getUserProfile, getUsers, updateUser, updateUserProfile } from '@/controllers';
import { verifyJwt } from '@/middleware';
import { verifyAdmin } from '@/middleware/auth.middleware';
import { Router } from 'express';

const router = Router();

router.use(verifyJwt);
router.route('/profile').get(getUserProfile).patch(updateUserProfile);

// admin routes
router.use(verifyAdmin);
router.route('/').get(getUsers);
router.route('/:id').delete(deleteUser).get(getUserById).patch(updateUser);

export default router;
