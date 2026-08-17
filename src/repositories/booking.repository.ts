import { prisma } from "../config/db.config.js";
import { getDbClient, type DbClient } from "./db-client.js";

export interface ListHostBookingsFilters {
    status?: string;
    from?: Date;
    to?: Date;
}

export interface CreateBookingData {
    slotId: string;
    inviteeEmail: string;
    inviteeName: string;
    inviteeNotes?: string;
    hostId: number;
    enventTypeId: number;
}

export async function createBooking(data:CreateBookingData,db?:DbClient){
    const client=getDbClient(db);

    return client.booking.create({
        data:{
            ...data,
            status:"CONFIRMED",
        },
        include:{
            slot:true,
        }
    });
}
