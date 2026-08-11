import { Request, Response } from "express";
import {
    createException as createExceptionService,
    createRule as createRuleService,
    listExceptions as listExceptionsService,
    listRules as listRulesService,
    removeException as removeExceptionService,
    removeRule as removeRuleService,
    updateException as updateExceptionService,
    updateRule as updateRuleService,
} from "../services/availability.service.js";

import { sendSuccess } from "../utils/api-responce.js";

export async function listRules(req: Request, res: Response) {
    const userId = req.userId!;
    const rules = await listRulesService(userId);
    sendSuccess(res, rules, 200);
}

export async function createRule(req: Request, res: Response) {
    const userId = req.userId!;
    const rule = await createRuleService(userId, req.body);
    sendSuccess(res, rule, 201, "Availability rule created successfully");
}

export async function updateRule(req: Request, res: Response) {
    const userId = req.userId!;
    const { id } = req.params;
    const rule = await updateRuleService(userId, Number(id), req.body);
    sendSuccess(res, rule, 200, "Availability rule updated successfully");
}

export async function removeRule(req: Request, res: Response) {
    const userId = req.userId!;
    const { id } = req.params;
    await removeRuleService(userId, Number(id));
    sendSuccess(res, null, 200, "Availability rule deleted successfully");
}

export async function listExceptions(req: Request, res: Response) {
    const userId = req.userId!;
    const exceptions = await listExceptionsService(userId);
    sendSuccess(res, exceptions, 200);
}

export async function createException(req: Request, res: Response) {
    const userId = req.userId!;
    const exception = await createExceptionService(userId, req.body);
    sendSuccess(res, exception, 201, "Availability exception created successfully");
}

export async function updateException(req: Request, res: Response) {
    const userId = req.userId!;
    const { id } = req.params;
    const exception = await updateExceptionService(userId, Number(id), req.body);
    sendSuccess(res, exception, 200, "Availability exception updated successfully");
}

export async function removeException(req: Request, res: Response) {
    const userId = req.userId!;
    const { id } = req.params;
    await removeExceptionService(userId, Number(id));
    sendSuccess(res, null, 200, "Availability exception deleted successfully");
}