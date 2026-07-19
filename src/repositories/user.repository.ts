import { prisma } from "../config/db.config.js";


export async function getAll() {
    const users = await prisma.user.findMany();
    return users;
}