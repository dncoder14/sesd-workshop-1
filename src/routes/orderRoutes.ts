import express from 'express';
import { OrderController } from '../controllers/OrderController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();
const orderController = new OrderController();

router.post('/', protect, orderController.addOrderItems);
router.get('/myorders', protect, orderController.getMyOrders);
router.get('/:id', protect, orderController.getOrderById);

export default router;
