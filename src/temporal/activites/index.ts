import { RegenerateHostSlotsInput, regenerateHostSlots as runSlotGeneration } from "../../services/slot.service.js";
import { sendBookingConfirmationEmail } from "../../mailer/booking.mailer.js";
import { createGoogleCalendarEvent, isProjectCalendarConfigured } from "../../services/google-calender.service.js";
import { updateBookingCalendarDetails } from "../../repositories/booking.repository.js";


export async function regenerateHostSlotsActivity(input: RegenerateHostSlotsInput) {
    await runSlotGeneration(input); // here actually the service function is called
}

export async function sendBookingConfirmationEmailActivity(bookingId: number) {
    await sendBookingConfirmationEmail(bookingId);
}

export async function createGoogleCalendarEventActivity(bookingId: number) {
    if (!isProjectCalendarConfigured()) {
        console.warn('[google-calendar] Google project calendar is not configured, skipping calendar event creation');
        return;
    }

    try {
        const details = await createGoogleCalendarEvent(bookingId);
        await updateBookingCalendarDetails(bookingId, details);
        console.log(`[google-calendar] Successfully created Google calendar event for booking ${bookingId}`);
    } catch (error) {
        console.error(`[google-calendar] Failed to create Google calendar event for booking ${bookingId}:`, error);
        throw error;
    }
}