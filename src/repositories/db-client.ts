import { prisma } from "../config/db.config.js";

export type TranscationClient = Parameters<
    Parameters<typeof prisma.$transaction>[0]
>[0];

export type DbClient = typeof prisma | TranscationClient;

export function getDbClient(db?: DbClient): DbClient {
    // the parameter db is our transction object

    return db ?? prisma;
}