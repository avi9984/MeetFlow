import { Request, Response } from "express";
import { findAllUsers as findAllUserService, findByUserId, createUsers } from "../services/user.service.js";
import { sendSuccess } from "../utils/api-responce.js";

export const getAllUsers = async (_req: Request, res: Response) => {
    const responce = await findAllUserService();
    sendSuccess(res, responce, 200);
}

export const getUserById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const responce = await findByUserId(id);
    sendSuccess(res,responce,200);
}

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    // console.log(req.body, "body aa rha hai");

    const responce = await createUsers({ name, email })
    res.json(responce);
}