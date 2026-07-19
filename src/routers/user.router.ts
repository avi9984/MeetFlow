import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controllers.js";

export const userRouter: Router = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);