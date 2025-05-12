import { Router } from 'express';
import {
  createUser,
  getUser,
  updateUserScore,
  getDashboard,
} from '../controllers/user.controller';

const router = Router();

// User routes
router.post('/users', createUser);
router.get('/users/:nickname', getUser);

// Game/Score routes (conceptually linked to users)
router.post('/games/score', updateUserScore);

// Dashboard route
router.get('/dashboard', getDashboard);

export default router; 