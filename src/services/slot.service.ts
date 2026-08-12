import { DateTime } from "luxon";
import { findById as getUserById } from "../repositories/user.repository.js";



export interface RegenerateHostSlotsInput {
    hostId: number,
    from?: string; // YYYY-MM-DD
    to?: string; // YYYY-MM-DD

}

export async function regenerateHostSlots(input: RegenerateHostSlotsInput) {

    const host = await getUserById(input.hostId);

    if (!host) return;

    const from = input.from
        ? DateTime.fromISO(input.from, { zone: host.timeZone }).toJSDate()
        : DateTime.now().toJSDate();

    const to = input.to
        ? DateTime.fromISO(input.to, { zone: host.timeZone }).toJSDate()
        : DateTime.now().plus({ weeks: 2 }).toJSDate();



}