import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { badRequest } from "../utils/api-error.js";

export const validate = (schema: ZodSchema) =>
    (req: Request, _res: Response, next: NextFunction) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {
            throw badRequest('Validation failed', result.error.issues);
        }

        // If the validation passes
        req.body = result.data;

        next(); // calling controller with the validation data
    }

export const validateQuery = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
        throw badRequest('Validation failed', result.error.issues);
    }
    req.query = result.data as Request['query'];
    next();
}