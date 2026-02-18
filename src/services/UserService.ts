import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../utils/AppError';
import { config } from '../config/config';
import { validate, registerSchema, loginSchema } from '../utils/validation';
import { IUser } from '../models/User';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    generateToken(id: string): string {
        return jwt.sign({ id }, config.jwtSecret, {
            expiresIn: '30d',
        });
    }

    async registerUser(data: any) {
        validate(registerSchema, data);

        const userExists = await this.userRepository.findByEmail(data.email);
        if (userExists) {
            throw new AppError('User already exists', 400);
        }

        const user = await this.userRepository.create(data);
        const token = this.generateToken(user._id as string);

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        };
    }

    async loginUser(data: any) {
        validate(loginSchema, data);

        const user = await this.userRepository.findByEmail(data.email);
        if (user && (await user.matchPassword(data.password))) {
            const token = this.generateToken(user._id as string);
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            };
        } else {
            throw new AppError('Invalid email or password', 401);
        }
    }

    async getUserById(id: string): Promise<IUser> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    }

    async getAllUsers(query: any): Promise<IUser[]> {
        return await this.userRepository.findAll(query);
    }
}
