import { BaseRepository } from './BaseRepository';
import { Order, IOrder } from '../models/Order';

export class OrderRepository extends BaseRepository<IOrder> {
    constructor() {
        super(Order);
    }

    async findByUserId(userId: string): Promise<IOrder[]> {
        return await this.model.find({ user: userId } as any);
    }

    // Override findById to populate user
    async findById(id: string): Promise<IOrder | null> {
        return await this.model.findById(id).populate('user', 'name email');
    }
}
