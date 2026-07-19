import { prisma } from "../config/db.config.js";


export async function getAll() {
    const users = await prisma.user.findMany();
    return users;
}

export async function findById(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return user;
}