import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../dtos/user.dto.js";

export const userRouter: Router = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', validate(createUserSchema), createUser);
userRouter.put('/:id', validate(updateUserSchema), updateUser);
userRouter.delete('/:id', deleteUser);