import { z } from "zod";

// Availability Rule Schemas
export const createAvailabilityRuleSchema = z.object({
    weekday: z.number().min(0).max(6, "Weekday must be between 0 (Sunday) and 6 (Saturday)"),
    startTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Start time must be in HH:MM format"),
    endTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "End time must be in HH:MM format"),
    isActive: z.boolean().default(true),
    timezone: z.string().default("UTC"),
});

export const updateAvailabilityRuleSchema = createAvailabilityRuleSchema.partial();

export type CreateAvailabilityRuleDto = z.infer<typeof createAvailabilityRuleSchema>;
export type UpdateAvailabilityRuleDto = z.infer<typeof updateAvailabilityRuleSchema>;

// Availability Exception Schemas
export const createAvailabilityExceptionSchema = z.object({
    date: z.string().regex(/^(?:\d{4}-\d{2}-\d{2})$/, "Date must be in YYYY-MM-DD format").transform((val) => new Date(val)),
    type: z.enum(["BLOCK_FULL_DAY", "BLOCK_PARTIAL", "ADD_AVAILABLE_WINDOW"]),
    startTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Start time must be in HH:MM format").optional().nullable(),
    endTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "End time must be in HH:MM format").optional().nullable(),
    timezone: z.string().default("UTC"),
    reason: z.string().optional().nullable(),
}).superRefine((data, ctx) => {
    if (data.type !== 'BLOCK_FULL_DAY') {
        if (!data.startTime) {
            ctx.addIssue({ path: ['startTime'], code: 'custom', message: 'Start time is required for a non-full day expetion' })
        }
        if (!data.endTime) {
            ctx.addIssue({ path: ['endTime'], code: 'custom', message: 'End time is required for a non-full day expetion' })
        }
        if (data.startTime && data.endTime && data.startTime >= data.endTime) {
            ctx.addIssue({ path: ['startTime', 'endTime'], code: 'custom', message: 'start time must be before end time' });
        }
    }
});

export const updateAvailabilityExceptionSchema = createAvailabilityExceptionSchema.partial();

export type CreateAvailabilityExceptionDto = z.infer<typeof createAvailabilityExceptionSchema>;
export type UpdateAvailabilityExceptionDto = z.infer<typeof updateAvailabilityExceptionSchema>;
