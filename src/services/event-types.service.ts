import slug from "slug";
import { CreateEventTypeDto } from "../dtos/event-type.dto.js";
import { create, deleteById, findByHostId, getById, slugExistsForHost } from "../repositories/event.type.repository.js";
import { conflict, forbidden, notFound } from "../utils/api-error.js";




export async function listEventType(hostId: number) {
    const eventType = await findByHostId(hostId);
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
    return create(hostId, { ...data, slug: passedSlug });
}

export async function removeEventType(hostId: number, id: number) {
    const eventType = await getById(id);
    if (!eventType) {
        throw notFound('Event type not found')
    }

    if (eventType.hostId !== hostId) {
        throw forbidden('You are not authorized to delete this event type');
    }
    return deleteById(id);
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

