import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { asyncHandler } from '../utils/asyncHandler';

const orderService = new OrderService();

export class OrderController {
    addOrderItems = asyncHandler(async (req: Request, res: Response) => {
        const order = await orderService.createOrder(req.body, req.user._id);
        res.status(201).json(order);
    });

    getOrderById = asyncHandler(async (req: Request, res: Response) => {
        const order = await orderService.getOrderById(req.params.id as string);
        // Optional: Check if user is admin or owner
        if (
            req.user.role !== 'admin' &&
            order.user.toString() !== req.user._id.toString()
        ) {
            res.status(403);
            throw new Error('Not authorized to view this order');
        }
        res.status(200).json(order);
    });

    getMyOrders = asyncHandler(async (req: Request, res: Response) => {
        const orders = await orderService.getOrdersByUser(req.user._id);
        res.status(200).json(orders);
    });
}
