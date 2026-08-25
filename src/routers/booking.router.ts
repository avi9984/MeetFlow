import { Router } from "express";
import { requireUserId } from "../middlewares/require-user-id.js";
import { validate, validateQuery } from "../middlewares/validate.js";
import { createBookingSchema, listHostBookingsQuerySchema } from "../dtos/booking.dto.js";
import { list, create } from "../controllers/booking.controller.js";

export const bookingRouter: Router = Router();

bookingRouter.use(requireUserId);

bookingRouter.get("/", validateQuery(listHostBookingsQuerySchema), list);
bookingRouter.post("/", validate(createBookingSchema), create);