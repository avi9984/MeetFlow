import { z } from "zod";

export const createEventTypeSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1000).optional(),
    durationMinutes: z.number().min(15).max(120).default(30),
    isActive: z.boolean().default(true),

    locationType: z.enum(['online', 'in-persion']).default('online'),
    locationValue: z.string().optional(),
    bufferBeforeMinutes: z.number().min(0).max(120).default(0),
    bufferAfterMinutes: z.number().min(0).max(120).default(0),
    slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
});

export const UpdateEventTypeSchema = createEventTypeSchema.partial();


export type CreateEventTypeDto = z.infer<typeof createEventTypeSchema>;
export type UpdateEventTypeDto = z.infer<typeof UpdateEventTypeSchema>;