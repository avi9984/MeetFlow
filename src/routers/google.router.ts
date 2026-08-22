import { Router } from "express";
import { setupGoogleCallback } from "../controllers/google.controller.js";

export const googleRouter: Router = Router();

googleRouter.get('/callback', setupGoogleCallback);