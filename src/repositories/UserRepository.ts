import { BaseRepository } from './BaseRepository';
import { User, IUser } from '../models/User';

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.model.findOne({ email }).select('+password');
    }
}
