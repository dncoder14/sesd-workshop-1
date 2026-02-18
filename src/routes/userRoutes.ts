import express from 'express';
import { UserController } from '../controllers/UserController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', protect, userController.getProfile);
router.get('/', protect, admin, userController.getAllUsers);

export default router;
