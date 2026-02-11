import { BaseRepository } from './BaseRepository.js';
import { Order } from '../models/Order.js';

export class OrderRepository extends BaseRepository {
    constructor() {
        super(Order);
    }

    async findByUserId(userId) {
        return await this.model.find({ user: userId });
    }

    // Override findById to populate user and product info if needed
    async findById(id) {
        return await this.model.findById(id).populate('user', 'name email');
    }
}
