import { proxyActivities } from "@temporalio/workflow";

import type * as activities from "../activites/index.js";



// Create the proxy activites

const { sendBookingConfirmationEmailActivity, createGoogleCalendarEventActivity } = proxyActivities<typeof activities>({
    retry: { maximumAttempts: 3 },
    startToCloseTimeout: '10 minutes',
})

export async function sendBookingConfirmationEmailWorkflow(bookingId: number) {
    await createGoogleCalendarEventActivity(bookingId);
    await sendBookingConfirmationEmailActivity(bookingId);
}