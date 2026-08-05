import { Request, Response } from "express";
import { listEventType, createEventType, removeEventType, getEventTypeById, getEvnetTypePublic, updateEventType } from "../services/event-types.service.js";
import { sendSuccess } from "../utils/api-responce.js";
import { badRequest } from "../utils/api-error.js";

export const list = async (req: Request, res: Response) => {
    const hostId = req.userId!;
    const response = await listEventType(hostId);
    sendSuccess(res, response, 200);
};

export const getById = async (req: Request, res: Response) => {
    const hostId = req.userId!;
    const id = Number(req.params.id);
    if (isNaN(id)) {
        throw badRequest('Event type ID must be a number');
    }
    const response = await getEventTypeById(id, hostId);
    sendSuccess(res, response, 200);
};

export const create = async (req: Request, res: Response) => {
    const hostId = req.userId!;
    const response = await createEventType(hostId, req.body);
    sendSuccess(res, response, 201, 'Create event type successfully');
};

export const update = async (req: Request, res: Response) => {
    const hostId = req.userId!;
    const id = Number(req.params.id);
    if (isNaN(id)) {
        throw badRequest('Event type ID must be a number');
    }
    const response = await updateEventType(hostId, id, req.body);
    sendSuccess(res, response, 200, 'Update event type successfully');
};

export const remove = async (req: Request, res: Response) => {
    const hostId = req.userId!;
    const id = Number(req.params.id);
    if (isNaN(id)) {
        throw badRequest('Event type ID must be a number');
    }
    await removeEventType(hostId, id);
    sendSuccess(res, null, 200, 'Delete event type successfully');
};

export const getPublicEventType = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const slug = req.params.slug as string;

    if (isNaN(userId)) {
        throw badRequest('User ID must be a number');
    }
    if (!slug) {
        throw badRequest('Slug is required');
    }

    const response = await getEvnetTypePublic(userId, slug);
    sendSuccess(res, response, 200);
};
