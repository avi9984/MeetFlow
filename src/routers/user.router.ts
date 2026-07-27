import { Router } from "express";
import { createUser, getAllUsers, getUserById } from "../controllers/user.controllers.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../dtos/user.dto.js";

export const userRouter: Router = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', validate(createUserSchema), createUser);