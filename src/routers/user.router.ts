import { Router } from "express";
import { getAllUsers } from "../controllers/user.controllers.js";

export const userRouter: Router = Router();

userRouter.get('/', getAllUsers);