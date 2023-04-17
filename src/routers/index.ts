import { Router } from 'express';
import healthCheck from './healthCheck';
import user from './user';

const router = Router();

router.use('/health', healthCheck);
router.use('/user', user);

export default router;