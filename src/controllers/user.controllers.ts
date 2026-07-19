import { Request, Response } from "express";
import { findAllUsers as findAllUserService, findByUserId } from "../services/user.service.js";

export const getAllUsers = async (_req: Request, res: Response) => {
    const responce = await findAllUserService();
    res.json(responce)
}

export const getUserById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const responce = await findByUserId(id);
    res.json(responce);
}