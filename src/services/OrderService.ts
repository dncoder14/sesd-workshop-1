import { OrderRepository } from '../repositories/OrderRepository';
import { AppError } from '../utils/AppError';
import { validate, orderSchema } from '../utils/validation';
import { IOrder } from '../models/Order';

export class OrderService {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async createOrder(data: any, userId: string): Promise<IOrder> {
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

    async getOrderById(id: string): Promise<IOrder> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new AppError('Order not found', 404);
        }
        return order;
    }

    async getOrdersByUser(userId: string): Promise<IOrder[]> {
        return await this.orderRepository.findByUserId(userId);
    }

    async updateOrderToPaid(id: string, paymentResult: any): Promise<IOrder> {
        const order = await this.orderRepository.findById(id);

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = paymentResult;

        const updatedOrder = await order.save();
        return updatedOrder;
    }
}
