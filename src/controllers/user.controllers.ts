import { Request, Response } from "express";
import { findAllUsers as findAllUserService } from "../services/user.service.js";

export const getAllUsers = async (_req: Request, res: Response) => {
    const responce = await findAllUserService();
    res.json(responce)
}