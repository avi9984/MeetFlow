import { Router } from "express";
import { createUser, getAllUsers, getUserById } from "../controllers/user.controllers.js";

export const userRouter: Router = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);