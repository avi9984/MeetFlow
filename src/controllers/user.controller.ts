import { Request, Response } from "express";
import { findAllUsers as findAllUserService, findByUserId as findByIdService, createUsers as createUserService, updateUser as updateUserService, deleteUser as deleteUserService } from "../services/user.service.js";
import { sendSuccess } from "../utils/api-responce.js";

export const getAllUsers = async (_req: Request, res: Response) => {
    const responce = await findAllUserService();
    sendSuccess(res, responce, 200);
}

export const getUserById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const responce = await findByIdService(id);
    sendSuccess(res,responce,200);
}

export const createUser = async (req: Request, res: Response) => {
    // console.log(req.body, "body aa rha hai");

    const responce = await createUserService(req.body);

    sendSuccess(res,responce,201,'Create user successfully')
}

export const updateUser = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const responce = await updateUserService(id, req.body);
    sendSuccess(res, responce, 200, 'Update user successfully');
}

export const deleteUser = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const responce = await deleteUserService(id);
    sendSuccess(res, responce, 200, 'Delete user successfully');
}