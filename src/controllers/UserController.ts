import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { asyncHandler } from '../utils/asyncHandler';

const userService = new UserService();


declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export class UserController {
    register = asyncHandler(async (req: Request, res: Response) => {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const user = await userService.loginUser(req.body);
        res.status(200).json(user);
    });

    getProfile = asyncHandler(async (req: Request, res: Response) => {
        const user = await userService.getUserById(req.user._id);
        res.status(200).json(user);
    });

    getAllUsers = asyncHandler(async (req: Request, res: Response) => {
        const users = await userService.getAllUsers(req.query);
        res.status(200).json(users);
    });
}
