import { OrderRepository } from '../repositories/OrderRepository.js';
import { AppError } from '../utils/AppError.js';
import { validate, orderSchema } from '../utils/validation.js';

export class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async createOrder(data, userId) {
        validate(orderSchema, data);

        if (data.orderItems && data.orderItems.length === 0) {
            throw new AppError('No order items', 400);
        }

        const order = await this.orderRepository.create({
            ...data,
            user: userId,
        });

        return order;
    }

    async getOrderById(id) {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new AppError('Order not found', 404);
        }
        return order;
    }

    async getOrdersByUser(userId) {
        return await this.orderRepository.findByUserId(userId);
    }

    async updateOrderToPaid(id, paymentResult) {
        const order = await this.orderRepository.findById(id);

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = paymentResult;

        return await order.save(); // Direct save on document or use updateById
    }
}
