import { OrderService } from '../services/OrderService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const orderService = new OrderService();

export class OrderController {
    addOrderItems = asyncHandler(async (req, res) => {
        const order = await orderService.createOrder(req.body, req.user._id);
        res.status(201).json(order);
    });

    getOrderById = asyncHandler(async (req, res) => {
        const order = await orderService.getOrderById(req.params.id);
        // Optional: Check if user is admin or owner
        if (
            req.user.role !== 'admin' &&
            order.user._id.toString() !== req.user._id.toString()
        ) {
            res.status(403);
            throw new Error('Not authorized to view this order');
        }
        res.status(200).json(order);
    });

    getMyOrders = asyncHandler(async (req, res) => {
        const orders = await orderService.getOrdersByUser(req.user._id);
        res.status(200).json(orders);
    });
}
