import mongoose from 'mongoose';
import { config } from './config';

export class Database {
    static async connect(): Promise<void> {
        try {
            await mongoose.connect(config.mongoUri);
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection error:', error);
            process.exit(1);
        }
    }

    static async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }
}
