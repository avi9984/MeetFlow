import { prisma } from "../config/db.config.js";
import {
    CreateAvailabilityRuleDto,
    UpdateAvailabilityRuleDto,
    CreateAvailabilityExceptionDto,
    UpdateAvailabilityExceptionDto
} from "../dtos/availability.dto.js";

// Availability Rule Methods
export async function findRulesByUser(userId: number) {
    const rules = await prisma.availabilityRule.findMany({
        where: {
            userId
        },
        orderBy: [{ weekday: 'asc' }, { startTime: 'asc' }]
    });
    return rules;
}

export async function findRuleById(id: number) {
    const rule = await prisma.availabilityRule.findUnique({
        where: {
            id
        }
    });
    return rule;
}

export async function createRule(userId: number, data: CreateAvailabilityRuleDto) {
    const rule = await prisma.availabilityRule.create({
        data: {
            userId,
            ...data
        }
    });
    return rule;
}

export async function updateRule(id: number, data: UpdateAvailabilityRuleDto) {
    const rule = await prisma.availabilityRule.update({
        where: {
            id
        },
        data
    });
    return rule;
}

export async function removeRule(id: number) {
    const rule = await prisma.availabilityRule.delete({
        where: {
            id
        }
    });
    return rule;
}

// Availability Exception Methods
export async function findExceptionsByUser(userId: number) {
    const exceptions = await prisma.availabilityException.findMany({
        where: {
            userId
        }
    });
    return exceptions;
}

export async function findExceptionsById(id: number) {
    const exception = await prisma.availabilityException.findUnique({
        where: {
            id
        }
    });
    return exception;
}

export async function createException(userId: number, data: CreateAvailabilityExceptionDto) {
    const exception = await prisma.availabilityException.create({
        data: {
            userId,
            ...data
        }
    });
    return exception;
}

export async function updateException(id: number, data: UpdateAvailabilityExceptionDto) {
    const exception = await prisma.availabilityException.update({
        where: {
            id
        },
        data
    });
    return exception;
}

export async function removeException(id: number) {
    const exception = await prisma.availabilityException.delete({
        where: {
            id
        }
    });
    return exception;
}

export async function findExceptionsByUserInRange(userId: number, startDate: Date, endDate: Date) {
    const exceptions = await prisma.availabilityException.findMany({
        where: {
            userId,
            date: {
                gte: startDate,
                lte: endDate
            }
        }
    });
    return exceptions;
}
