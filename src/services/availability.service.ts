import {
    CreateAvailabilityExceptionDto,
    CreateAvailabilityRuleDto,
    UpdateAvailabilityRuleDto,
} from "../dtos/availability.dto.js";
import {
    findRulesByUser,
    findRuleById,
    createRule as createRuleInDb,
    updateRule as updateRuleInDb,
    removeRule as removeRuleInDb,
    findExceptionsByUser,
} from "../repositories/availability.repository.js";
import { forbidden, notFound } from "../utils/api-error.js";

// Availability Rule Service Functions

export async function listRules(userId: number) {
    return findRulesByUser(userId);
}

export async function createRule(userId: number, data: CreateAvailabilityRuleDto) {
    return createRuleInDb(userId, data);
}

export async function removeRule(userId: number, id: number) {
    const rule = await findRuleById(id);
    if (!rule) {
        throw notFound("Availability rule not found");
    }

    if (rule.userId !== userId) {
        throw forbidden("You are not authorized to delete this availability rule");
    }

    return removeRuleInDb(id);
}

export async function updateRule(id: number, userId: number, data: UpdateAvailabilityRuleDto) {
    const rule = await findRuleById(id);
    if (!rule) {
        throw notFound("Availability rule not found");
    }

    if (rule.userId !== userId) {
        throw forbidden("You are not authorized to update this availability rule");
    }

    return updateRuleInDb(id, data);
}


export async function listExceptions(userId: number) {
    return findExceptionsByUser(userId);
}
