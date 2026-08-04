import { prisma } from "../config/db.config.js";
import { CreateEventTypeDto } from "../dtos/event-type.dto.js";


export async function findByHostId(hostId: number) {
    const eventType = await prisma.eventType.findMany({
        where: {
            hostId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return eventType;
}

export async function getById(id: number) {
    const eventType = await prisma.eventType.findUnique({
        where: { id }
    });
    return eventType;
}

export async function create(hostId: number, data: CreateEventTypeDto & { slug: string }) {
    const eventType = await prisma.eventType.create({
        data: { hostId, ...data }
    });
    return eventType;
}

export async function update(id: number, data: CreateEventTypeDto) {
    const eventType = await prisma.eventType.update({
        where: { id },
        data
    });
    return eventType;
}

export async function deleteById(id: number) {
    await prisma.eventType.delete({
        where: { id }
    });
}

export async function findByHostAndSlug(hostId: number, slug: string) {
    const eventType = await prisma.eventType.findFirst({
        where: { hostId, slug }
    });
    return eventType;
}

export async function slugExistsForHost(hostId: number, slug: string) {
    const exists = await prisma.eventType.findFirst({
        where: {
            hostId,
            slug
        }
    })
    return exists !== null;
}