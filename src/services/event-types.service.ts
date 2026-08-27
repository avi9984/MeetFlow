import slug from "slug";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dtos/event-type.dto.js";
import { create, deleteById, findActiveByHostIdAndEventSlug, findByHostId, getById, slugExistsForHost, update } from "../repositories/event.type.repository.js";
import { conflict, forbidden, notFound } from "../utils/api-error.js";
import { findById as getUserById } from "../repositories/user.repository.js";
import { startRegenerateHostSlotsWorkflow } from "../temporal/client.js";





export async function listEventType(hostId: number) {
    const eventType = await findByHostId(hostId);
    console.log("eventType", eventType);
    return eventType;
}

export async function createEventType(hostId: number, data: CreateEventTypeDto) {
    const passedSlug = data.slug || slug(data.title, { lower: true, replacement: '-' });

    if (!passedSlug) {
        throw conflict('Could not generate a slug for the event type')
    }

    const isSlugTaken = await slugExistsForHost(hostId, passedSlug);
    if (isSlugTaken) {
        throw conflict('A event type with this slug already exists, plase use the differnet slug')
    }
    const eventType = create(hostId, { ...data, slug: passedSlug });
    await startRegenerateHostSlotsWorkflow({ hostId });
    return eventType;
}

export async function removeEventType(hostId: number, id: number) {
    const eventType = await getById(id);
    if (!eventType) {
        throw notFound('Event type not found')
    }

    if (eventType.hostId !== hostId) {
        throw forbidden('You are not authorized to delete this event type');
    }
    const removedEventType = await deleteById(id);
    await startRegenerateHostSlotsWorkflow({ hostId });
    return removedEventType;
}

export async function getEventTypeById(id: number, hostId: number) {
    const eventType = await getById(id);
    if (!eventType) {
        throw notFound('Event type not found');
    }
    if (eventType.hostId !== hostId) {
        throw forbidden('You are not authorized to view this event');
    }
    return eventType;
}

export async function getEvnetTypePublic(hostId: number, evnetSlug: string) {
    const eventType = await findActiveByHostIdAndEventSlug(hostId, evnetSlug);
    if (!eventType) {
        throw notFound('Event type not found');
    }
    const host = await getUserById(hostId);

    if (!host) {
        throw notFound('Host not found');
    }
    return {
        eventType: {
            id: eventType.id,
            title: eventType.title,
            description: eventType.description,
            durationMinutes: eventType.durationMinutes,
            locationType: eventType.locationType
        },
        host: {
            name: host.name,
            email: host.email
        }
    }
}

export async function updateEventType(hostId: number, id: number, data: UpdateEventTypeDto) {
    const eventType = await getById(id);
    if (!eventType) {
        throw notFound('Event type not found');
    }

    if (eventType.hostId !== hostId) {
        throw forbidden('You are not authorized to update this event type');
    }

    const passedSlug = data.slug;
    if (passedSlug && passedSlug !== eventType.slug) {
        const isSlugTaken = await slugExistsForHost(hostId, passedSlug);
        if (isSlugTaken) {
            throw conflict('A event type with this slug already exists, please use a different slug');
        }
    }

    const updateEventType = await update(id, data);
    await startRegenerateHostSlotsWorkflow({ hostId });
    return updateEventType;
}

