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
    type: z.string().min(1, "Type is required"),
    startTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Start time must be in HH:MM format").optional().nullable(),
    endTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "End time must be in HH:MM format").optional().nullable(),
    timezone: z.string().default("UTC"),
    reason: z.string().optional().nullable(),
});

export const updateAvailabilityExceptionSchema = createAvailabilityExceptionSchema.partial();

export type CreateAvailabilityExceptionDto = z.infer<typeof createAvailabilityExceptionSchema>;
export type UpdateAvailabilityExceptionDto = z.infer<typeof updateAvailabilityExceptionSchema>;
