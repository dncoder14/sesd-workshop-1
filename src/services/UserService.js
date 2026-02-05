import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository.js';
import { AppError } from '../utils/AppError.js';
import { config } from '../config/config.js';
import { validate, registerSchema, loginSchema } from '../utils/validation.js';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    generateToken(id) {
        return jwt.sign({ id }, config.jwtSecret, {
            expiresIn: '30d',
        });
    }

    async registerUser(data) {
        validate(registerSchema, data);

        const userExists = await this.userRepository.findByEmail(data.email);
        if (userExists) {
            throw new AppError('User already exists', 400);
        }

        const user = await this.userRepository.create(data);
        const token = this.generateToken(user._id);

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        };
    }

    async loginUser(data) {
        validate(loginSchema, data);

        const user = await this.userRepository.findByEmail(data.email);
        if (user && (await user.matchPassword(data.password))) {
            const token = this.generateToken(user._id);
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

    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    }

    async getAllUsers(query) {
        // Basic implementation of getAll with pagination logic could go here or Repository
        return await this.userRepository.findAll(query);
    }
}
