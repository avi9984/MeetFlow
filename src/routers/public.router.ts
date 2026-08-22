import { Router } from "express";
import { getPublicEventType } from "../controllers/event-type.controller.js";

export const publicRouter: Router = Router();

publicRouter.get('/event-types/:userId/:slug', getPublicEventType);
