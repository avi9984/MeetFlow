import { NextFunction, Request, Response } from "express";
import { unauthorized } from "../utils/api-error.js";

export const requireUserId = (req: Request, _res: Response, next: NextFunction) => {
    const userIdHeader = 
        req.headers['x-user-id'] || 
        req.headers['user-id'] || 
        req.headers['x-host-id'] || 
        req.headers['host-id'];

    if (!userIdHeader) {
        throw unauthorized('Unauthorized: User ID is required in headers');
    }

    const userId = Number(userIdHeader);
    if (isNaN(userId)) {
        throw unauthorized('Unauthorized: User ID header must be a number');
    }

    req.userId = userId;
    next();
};
