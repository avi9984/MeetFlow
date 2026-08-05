import { Router } from "express";
import { list, getById, create, update, remove } from "../controllers/event-type.controllers.js";
import { validate } from "../middlewares/validate.js";
import { createEventTypeSchema, UpdateEventTypeSchema } from "../dtos/event-type.dto.js";
import { requireUserId } from "../middlewares/require-user-id.js";

export const eventTypeRouter: Router = Router();

// Require userId header for all event-type management routes
eventTypeRouter.use(requireUserId);

eventTypeRouter.get('/', list);
eventTypeRouter.get('/:id', getById);
eventTypeRouter.post('/', validate(createEventTypeSchema), create);
eventTypeRouter.put('/:id', validate(UpdateEventTypeSchema), update);
eventTypeRouter.delete('/:id', remove);
