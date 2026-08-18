import { Request, Response } from "express";
import {
    createBookingOptimistically,
    listHostBookings as listHostBookingsService
} from "../services/booking.service.js";
import { sendSuccess } from "../utils/api-responce.js";
import { ListHostBookingsQuery } from "../dtos/booking.dto.js";


export async function create(req: Request, res: Response) {
    const result = await createBookingOptimistically(req.userId!, req.body);
    // const result = await createBookingOptimistically(req.userId!, req.body);
    sendSuccess(res, result, 201, "Booking created successfully");
}


export async function list(req: Request, res: Response) {
    const result = await listHostBookingsService(req.userId!, req.query as ListHostBookingsQuery);
    sendSuccess(res, result, 200, "All list")
} 