import { UserService } from '../services/UserService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const userService = new UserService();

export class UserController {
    register = asyncHandler(async (req, res) => {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    });

    login = asyncHandler(async (req, res) => {
        const user = await userService.loginUser(req.body);
        res.status(200).json(user);
    });

    getProfile = asyncHandler(async (req, res) => {
        const user = await userService.getUserById(req.user._id);
        res.status(200).json(user);
    });

    getAllUsers = asyncHandler(async (req, res) => {
        const users = await userService.getAllUsers(req.query);
        res.status(200).json(users);
    });
}
